import Trophy from "./Trophy"

const shelfOne = [
  { name: "Typescript", icon: "/icons/typescript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
]

const shelfTwo = [
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
]

const shelfThree = [
  { name: "Mongo DB", icon: "/icons/mongodb.svg" },
  { name: "Supabase", icon: "/icons/supabase.svg" },
  { name: "Vercel", icon: "/icons/vercel.svg" },
]

export default function Profile() {
  return (
    <section className="min-h-screen flex justify-evenly p-10">
      <div className="absolute left-10 text-3xl">
        <a href="/" className="group flex items-center justify-between w-45">
          <img src="/icons/chevrons-left.svg" alt="back" />
          <span> About </span>
          <span className="absolute left-0 bottom-0 block h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div className="w-2/5 flex flex-col items-center justify-center">
        <div className="w-75 h-90 flex items-center justify-center mb-4">
          <img
            src="/images/profile.webp"
            alt="Mi Foto de Perfil"
            width={1000}
            height={1200}
            loading="eager"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Sobre mí</h1>
          <p className="text-base text-zinc-300 leading-relaxed">
            Aquí puedes escribir una breve descripción sobre tu experiencia, qué
            te apasiona, en qué estás trabajando actualmente y por qué estas
            tecnologías son importantes para ti.
          </p>
        </div>
      </div>

      <div className="w-1/3 flex flex-col space-y-4 justify-center">
        <div className="flex justify-between">
          {shelfOne.map((tech) => (
            <Trophy icon={tech.icon} name={tech.name} key={tech.name} />
          ))}
        </div>
        <div className="flex justify-between">
          {shelfTwo.map((tech) => (
            <Trophy icon={tech.icon} name={tech.name} key={tech.name} />
          ))}
        </div>
        <div className="flex justify-between">
          {shelfThree.map((tech) => (
            <Trophy icon={tech.icon} name={tech.name} key={tech.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
