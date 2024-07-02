import React from 'react'
import './Work.css';
import portfolio1 from '../../assets/porfolio1.jpeg'
import portfolio2 from '../../assets/portfolio2.jpg'
import portfolio3 from '../../assets/portfolio3.png'
import portfolio4 from '../../assets/portfolio4.jpeg'
import portfolio5 from '../../assets/Portfolio5.jpeg'
import portfolio6 from '../../assets/portfolio6.avif'

export default function Work() {
  return (
    <section id='works'>
      <h2 className="workTitle">My Portfolio</h2>
      <p className="workDesc">I take pride in paying attention to the smallest details and making sure that my work is pixel perfect. I am excited to bring my skills and experience to help business achive their goals and create a strong online presence.</p>
      <div className="worksImgs">
        <img src={portfolio1} alt="portfolio1" className="worksimg" />
        <img src={portfolio2} alt="portfolio2" className="worksimg" /><img src={portfolio3} alt="portfolio3" className="worksimg" /><img src={portfolio4} alt="portfolio4" className="worksimg" />
        <img src={portfolio5} alt="portfolio5" className="worksimg" /><img src={portfolio6} alt="porfolio6"className="worksimg" />
      </div>
      <button className="worksBtn">See More</button>
    </section>
  )
}
