
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import {
//   BottomSheetFlatList,
//   BottomSheetModal,
//   BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import request from "@/src/services/axios/request";
// import Input from "../Input/Input";
// import Toast from "react-native-toast-message";
// import SavedIcon from "../../../assets/nav/savedposts.svg";
// import Block from "../../../assets/post_icons/Block.svg";
// import Bookmark from "../../../assets/post_icons/Bookmark.svg";
// import Connect from "../../../assets/post_icons/Connect.svg";
// import Hub from "../../../assets/post_icons/Hub.svg";
// import Mute from "../../../assets/post_icons/Mute.svg";
// import Report from "../../../assets/post_icons/Report.svg";
// import Uninterested from "../../../assets/post_icons/Uninterested.svg";
// import { useMuteUser } from "@/src/hooks/useMuteUser";
// import { useBlockUser } from "@/src/hooks/useBlockUser";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@/src/navigation/MainNavigation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useTheme } from "@/src/themes";
// import { Theme } from "@/src/themes/types";

// type user = {
//   username: string;
//   following: number[];
// };

// const PostModal = ({ selectedPostItem,onUserUpdate }: any) => {
//   const { theme } = useTheme();
//   const styles = createStyles(theme);
//   const username = selectedPostItem?.user?.username;

//   const { isMuted, handleToggleMuteUser } = useMuteUser(username);
//   const { isBlocked, handleToggleBlockUser } = useBlockUser(username);
//   const [user, setUser] = useState<user | null>(null);
//    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

//     // Load user data immediately from AsyncStorage 
//   const loadCachedUserData = useCallback(async () => {
//     try {
//       const currentUserData = await AsyncStorage.getItem("user");
//       if (currentUserData) {
//         const currentUser = JSON.parse(currentUserData);
//         setUser(currentUser);
//       }
//       setIsUserDataLoaded(true);
//     } catch (error) {
//       console.error("Error loading cached user data:", error);
//       setIsUserDataLoaded(true);
//     }
//   }, []);
 
//   const fetchFreshUserData = useCallback(async () => {
//   try {

//      setIsUserDataLoaded(false);
//     // First get current user data from AsyncStorage to get their ID
//     const currentUserData = await AsyncStorage.getItem("user");
//     if (!currentUserData) {
//       console.error("No current user data found");
//        setIsUserDataLoaded(true);
//       return;
//     }
    
//     const currentUser = JSON.parse(currentUserData);
    
//     // Fetch fresh current user data from server using their ID
//     const response = await request({
//       method: "GET",
//       endpoint: `/user/${currentUser.id}`,
//     });
    
//     if (response?.user) {
//       // Update AsyncStorage with fresh data
//       await AsyncStorage.setItem("user", JSON.stringify(response.user));
//       setUser(response.user);
//     }
//   } catch (error) {
//     console.error("Error fetching fresh user data:", error);
//   } finally {
//       setIsUserDataLoaded(true);
//     }
// }, [selectedPostItem?.user?.id]);

//  // Load cached data immediately when modal opens
//   useEffect(() => {
//     if (selectedPostItem) {
//       loadCachedUserData().then(() => {
//         // Fetch fresh data in background after cached data is loaded
//         fetchFreshUserData();
//       });
//     }
//   }, [selectedPostItem, loadCachedUserData, fetchFreshUserData]);

// // Also update when user update trigger changes
// useEffect(() => {
//   if (onUserUpdate) {
//     fetchFreshUserData(); 
//   }
// }, [onUserUpdate, fetchFreshUserData]);
  

//   type NavigationProp = NativeStackNavigationProp<
//     RootStackParamList,
//     "ReportScreen"
//   >;
//   const navigation = useNavigation<NavigationProp>();

//   const collectionBottomSheetRef = useRef<BottomSheetModal>(null);
//   const [loading, setLoading] = useState(false);
//   const [isCollectionModalVisible, setIsCollectionModalVisible] =
//     useState(false);
//   const [collections, setCollections] = useState<
//     Array<{ id: number; name: string }>
//   >([]);

//   const [newCollectionName, setNewCollectionName] = useState("");
//   const [creatingCollection, setCreatingCollection] = useState(false);
//   const isFollowing = user?.following?.includes(selectedPostItem?.user?.id);

//   const isOwnPost = user?.username === username;

//   const getCollections = async () => {
//     setLoading(true);
//     try {
//       const response = await request({
//         method: "GET",
//         endpoint: "/collections/",
//       });

//       setCollections(response);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getCollections();
//   }, []);

//   const handleCreateCollection = useCallback(async () => {
//     if (!newCollectionName.trim()) {
//       Toast.show({
//         type: "error",
//         text1: "Collection Name Required",
//         text2: "Please enter a name for the new collection.",
//       });
//       return;
//     }

//     setCreatingCollection(true);
//     try {
//       const response = await request({
//         method: "POST",
//         endpoint: "/collections/",
//         data: { name: newCollectionName },
//       });

//       if (!response?.id || !response?.name) {
//         throw new Error("Invalid API response: Missing id or name");
//       }

//       setCollections((prev) => [...prev, response]);
//       setNewCollectionName("");

//       Toast.show({
//         type: "success",
//         text1: "Collection Created",
//         text2: `Saved to "${response.name}"`,
//       });

//       setIsCollectionModalVisible(false);
//     } catch (error) {
//       console.error(
//         "Error creating collection:",
//         //@ts-ignore
//         error.response?.data ?? error.message
//       );
//       Alert.alert("Error", "Failed to create collection.");
//     } finally {
//       setCreatingCollection(false);
//     }
//   }, [newCollectionName]);

//   useEffect(() => {
//     if (isCollectionModalVisible) {
//       collectionBottomSheetRef.current?.present();
//     }
//   }, [isCollectionModalVisible]);

//   const openCollectionList = () => {
//     setIsCollectionModalVisible(true);
//     collectionBottomSheetRef.current?.present();
//   };

//   const handleSavePost = useCallback(
//     async (collection: { id: number; name: string }) => {
//       if (!selectedPostItem || !collection) return;

//       setLoading(true);
//       try {
//         await request({
//           method: "POST",
//           endpoint: "/saved/",
//           data: {
//             post: selectedPostItem.id,
//             collection: collection.id,
//           },
//         });

//         Toast.show({
//           type: "success",
//           text1: "Post Saved",
//           text2: `Saved to "${collection.name}" successfully!`,
//         });

//         collectionBottomSheetRef.current?.dismiss();
//         setIsCollectionModalVisible(false);
//       } catch (error) {
//         console.error("Full error object:", error);
      

//         // let errorMessage = "An error occurred while saving the post.";

//         // try {
//         //   //@ts-ignore
//         //   const parsedError = JSON.parse(error.message);
//         //   console.log("Koca: parsedError ", parsedError);

//         //   if (parsedError.non_field_errors?.[0]) {
//         //     const apiErrorMessage = parsedError.non_field_errors[0];

//         //     if (apiErrorMessage.includes("already saved in the collection")) {
//         //       errorMessage = `This post is already saved in "${collection.name}".`;
//         //     } else {
//         //       errorMessage = apiErrorMessage;
//         //     }
//         //   }
//         // } catch (parseError) {
//         //   console.error("Error parsing API error message:", parseError);
//         // }

//         Toast.show({
//           type: "error",
//           text1: "Failed to Save",
//           text2:
//             error.non_field_errors ||
//             "An error occurred while saving the post.",
//         });
//         collectionBottomSheetRef.current?.dismiss();

//         console.error("Final error message shown:", error);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [selectedPostItem]
//   );

//   const handleReportPost = () => {
//     navigation.navigate("ReportScreen", { postId: selectedPostItem.id });
//   };

//     return (
//     <>
//       <BottomSheetModalProvider>
//         <View style={styles.container} key={selectedPostItem.id}>
//           {/* Save Post Button - Always show */}
//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={styles.optionItem}
//             onPress={openCollectionList}
//           >
//             <Bookmark width={24} height={24} />
//             <Text style={styles.optionText}>Save Post</Text>
//           </TouchableOpacity>

//           {/* Hub Information - Always show */}
//           <TouchableOpacity activeOpacity={0.9} style={styles.optionItem}>
//             <Hub width={24} height={24} />
//             <Text style={styles.optionText}>Hub Information</Text>
//           </TouchableOpacity>

//           {/* Options for OTHER users' posts only */}
//           {!isOwnPost && (
//             <>
//               <TouchableOpacity activeOpacity={0.9} style={styles.optionItem}>
//                 <Connect width={24} height={24} />
//                 <Text style={styles.optionText}>
//                   {isFollowing ? "Connected " : "Disconnected "}with{" "}
//                   <Text style={styles.usernameHighlight}>@{username}</Text>
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={styles.optionItem}
//                 onPress={handleToggleMuteUser}
//               >
//                 <Mute width={24} height={24} />
//                 <Text style={styles.optionText}>
//                   {isMuted ? "Unmute" : "Mute"}{" "}
//                   <Text style={styles.usernameHighlight}>@{username}</Text>
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={styles.optionItem}
//                 onPress={handleToggleBlockUser}
//               >
//                 <Block width={24} height={24} />
//                 <Text style={styles.optionText}>
//                   {isBlocked ? "Unblock" : "Block"}{" "}
//                   <Text style={styles.usernameHighlight}>@{username}</Text>
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={styles.optionItem}
//                 onPress={handleReportPost}
//               >
//                 <Report width={24} height={24} />
//                 <Text style={styles.optionText}>Report Post</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={[styles.optionItem, styles.lastItem]}
//               >
//                 <Uninterested width={24} height={24} />
//                 <Text style={styles.optionText}>Not Interested</Text>
//               </TouchableOpacity>
//             </>
//           )}

//           {/* For own posts, make Hub Information the last item */}
//           {isOwnPost && (
//             <View style={[styles.optionItem, styles.lastItem]} />
//           )}
//         </View>
//       </BottomSheetModalProvider>

//       <BottomSheetModal
//         ref={collectionBottomSheetRef}
//         index={0}
//         snapPoints={["80%"]}
//         backgroundStyle={{ backgroundColor: theme.colors.card }}
//         handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
//       >
//         <View style={styles.collectionContainer}>
//           <Text style={styles.collectionTitle}>Save to Collection</Text>

//           {loading ? (
//             <ActivityIndicator
//               size="large"
//               color={theme.colors.primary}
//               style={styles.loader}
//             />
//           ) : (
//             <>
//               <View className="mb-4">
//                 <Input
//                   value={newCollectionName}
//                   onChangeText={setNewCollectionName}
//                   placeholder="Create new collection"
//                   containerStyle={styles.inputContainer}
//                 />

//                 <TouchableOpacity
//                   style={styles.createButton}
//                   onPress={handleCreateCollection}
//                   disabled={creatingCollection}
//                 >
//                   <Text style={styles.createButtonText}>
//                     {creatingCollection ? "Creating..." : "Create"}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.savedCollectionsTitle}>My Collections</Text>

//               <BottomSheetFlatList
//                 data={collections}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={styles.collectionItem}
//                     onPress={() => handleSavePost(item)}
//                   >
//                     <SavedIcon width={24} height={24} />
//                     <Text style={styles.collectionName}>{item.name}</Text>
//                   </TouchableOpacity>
//                 )}
//                 contentContainerStyle={styles.collectionsList}
//               />
//             </>
//           )}
//         </View>
//       </BottomSheetModal>
//     </>
//   );
// };

// const createStyles = (theme: Theme) =>
//   StyleSheet.create({
//     container: {
//       paddingHorizontal: 20,
//       marginTop: 24,
//     },
//     optionItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       paddingVertical: 20,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       gap: 15,
//     },
//     lastItem: {
//       borderBottomWidth: 0,
//     },
//     optionText: {
//       fontFamily: theme.fontFamily.medium,
//       fontSize: theme.fontSize.sm,
//       color: theme.colors.textPrimary,
//     },
//     usernameHighlight: {
//       color: theme.colors.primary,
//     },
//     collectionContainer: {
//       padding: 16,
//       flex: 1,
//     },
//     collectionTitle: {
//       fontSize: theme.fontSize.lg,
//       fontFamily: theme.fontFamily.semibold,
//       color: theme.colors.textPrimary,
//       marginBottom: 16,
//     },
//     loader: {
//       marginTop: 24,
//     },
//     inputContainer: {
//       marginBottom: 12,
//     },
//     createButton: {
//       backgroundColor: theme.colors.primary,
//       paddingVertical: 12,
//       borderRadius: theme.borderRadius.md,
//       alignItems: "center",
//       marginBottom: 24,
//     },
//     createButtonText: {
//       color: theme.colors.white,
//       fontFamily: theme.fontFamily.medium,
//       fontSize: theme.fontSize.sm,
//     },
//     savedCollectionsTitle: {
//       fontSize: theme.fontSize.md,
//       fontFamily: theme.fontFamily.medium,
//       color: theme.colors.textPrimary,
//       marginBottom: 12,
//       textAlign: "center",
//     },
//     collectionsList: {
//       paddingBottom: 24,
//     },
//     collectionItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       paddingVertical: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: theme.colors.border,
//       gap: 12,
//     },
//     collectionName: {
//       fontFamily: theme.fontFamily.medium,
//       fontSize: theme.fontSize.sm,
//       color: theme.colors.textPrimary,
//     },
//   });

// export default PostModal;




