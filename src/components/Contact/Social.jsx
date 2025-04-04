export default function Social() {
  return (
    <div className="min-h-screen flex justify-center items-center p-10">
      <div className="flex w-full max-w-5xl">
        {/* Columna izquierda: Título */}
        <div className="w-1/2 flex justify-center items-center">
          <h1 className="text-4xl font-bold  text-center">
            Let's get in touch!
          </h1>
        </div>
        {/* Columna derecha: Iconos */}
        <div className="w-1/2 flex flex-col space-y-8 items-start">
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            className="w-full flex items-center p-6 border-b-1 border-gray-300"
          >
            <img
              width={50}
              height={50}
              src="/icons/mail.svg"
              alt="mail"
              className="mx-12"
            />
            <span className="text-lg font-medium">Mail</span>
          </a>
          <a
            href="https://www.linkedin.com/in/santiago-ferro-raffin-825708255/"
            className="w-full flex items-center p-6 border-b-1 border-gray-300"
          >
            <img
              width={50}
              height={50}
              src="/icons/linkedin.svg"
              alt="linkedin"
              className="mx-12"
            />
            <span className="text-lg font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com/NeuroNEAdev"
            className="w-full flex items-center p-6 border-b-1 border-gray-300"
          >
            <img
              width={50}
              height={50}
              src="/icons/github.svg"
              alt="github"
              className="mx-12"
            />
            <span className="text-lg font-medium">Github</span>
          </a>
          <a
            href="/"
            className="flex items-center p-6"
          >
            <img
              width={50}
              height={50}
              src="/icons/phone.svg"
              alt="phone"
              className="mx-12"
            />
            <span className="text-lg font-medium">Phone</span>
          </a>
        </div>
      </div>
    </div>
  );
}
