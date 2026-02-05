import Header from './components/Header';
import Landing from './components/Landing';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Adventures from './components/Adventures';
import Certificates from './components/Certificates';
import Jackie from './components/Jackie';
import Divider from './components/Divider';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <Header />
      <Landing />

      {/* Content Section - snaps, then scrolls normally inside */}

      <section
        className="h-screen snap-start bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('/images/bg-plain.png')" }}
      >

        <div className="h-full overflow-y-auto">
          <div className="bg-black/50">
            <div id="about"><AboutMe /></div>
            <Divider />
            <div id="education"><Education /></div>
            <Divider />
            <div id="experience"><Experience /></div>
            <Divider />
            <div id="projects"><Projects /></div>
            <Divider />
            <div id="certificates"><Certificates /></div>
            <Divider />
            <div id="adventures"><Adventures /></div>
            <Divider />
            <div id="jackie"><Jackie /></div>
          </div>
        </div>
      </section>
      <ChatWidget />
    </div>
  );
}

export default App;