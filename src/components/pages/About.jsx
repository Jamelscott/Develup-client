import "../layout/About.css"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useEffect } from "react"

export default function Contact({setCurrentCategory}) {

  useEffect(() => {
    
    setCurrentCategory("About the devs")

  }, [])
  return (
    <>
      <div className="main-title" src="blue-gradient.jpeg">
        <h1>Welcome to DevelUp +</h1>
        <h5 className="descriptionApp">
          DevelUp + allows users to create flashcards and organize them by categories. It is a BETTER version of Quizlet or Anki. <div className="timeDevel">It's time to DevelUp!</div>
        </h5>
        </div>
      <main className="cards team-title">
        <article className="card">
          <img src="images/jamel.jpg" alt="Photo of Jamel" />
          <div className="text">
            <h3>Jamel Scott Fadel</h3>
            <p>My passion for technical work and readiness for open discussion has given me the ability to promptly switch between an independent and collaborative mindset. As an authentic leader, I feel compelled to cultivate trust and reliability in my professional relationships. I use my desire for challenge, passion for technology and technical experience to shape the digital future.</p>
            <a href="https://github.com/Jamelscott" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/jamelfadel/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card">
          <img src="images/sol.jpg" alt="Photo of Sol" />
          <div className="text">
            <h3>Sol Youn</h3>
            <p>
            I am a Software Developer with a background in the healthcare industry where I learned to be open-minded, resilient, and detail-oriented. I am always ready to fearlessly spearhead the next project. Currently searching for exciting opportunities to apply my technical and communication skills.
            </p>
            <a href="https://github.com/Luflos" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/sol-youn/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card">
          <img src="images/gabe.jpg" alt="Photo of Gabe" />
          <div className="text">
            <h3>Gabe Guevara</h3>
            <p>I am results oriented software engineer who enjoys working on financial related products. That is so important to me because I have several years helping people and companies achieve their goals through wealth management strategies. As the corporate landscape has evolved I am inspired to create the platforms that shape our world's financial future. I also love coding, family and pray they all stay together.</p>
            <a href="https://github.com/gitgabrielguevara" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/gabriel-guevara-fullstack/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
        <article className="card">
          <img src="images/brian.jpg" alt="Photo of Brian" />
          <div className="text">
            <h3>Brian Lee</h3>
            <p>
            I am a Full Stack Web Developer who is inspired to provide creative solutions to open ended problems and driven to master his craft. With my experience in the social service industry, I am confident on how adaptable I am working under any environment while being able to provide exceptional communication and feedback to my team members.
            </p>
            <a href="https://github.com/br1anlee" target="_blank">
              <FaGithub size={30}/>
            </a>
            <a href="https://www.linkedin.com/in/brianjoonmolee/" target="_blank">
              <FaLinkedin size={30}/>
            </a>
          </div>
        </article>
      </main>
      <div>
      <h4 className="team-title">This App is proudly brought to you by team jamelCase 🐫</h4>
      </div>
    </>
  )
}
