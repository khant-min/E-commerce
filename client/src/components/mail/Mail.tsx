import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";

const Mail = () => {
  const form = useRef<HTMLFormElement>(null!);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pmaeg8v",
        "template_lmdy6iv",
        form.current,
        "xbZzt6V4t69qmvYff"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="bg-blue-200 md:max-w-full lg:max-w-[60%] m-auto mt-20 p-10">
      <div className="flex">
        <Link to="/" className="bg-gray-200 p-3 rounded-md">
          <BsArrowBarLeft />
        </Link>
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-1 m-auto max-w-[60%]"
      >
        <label htmlFor="name">Your name</label>
        <input
          required
          autoComplete="off"
          className="p-1.5 rounded-md"
          type="text"
          id="name"
          name="user_name"
          placeholder="What's your name?"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setName(e.target.value)
          }
        />

        <label htmlFor="email">Your email</label>
        <input
          required
          className="p-1.5 rounded-md"
          type="email"
          id="email"
          name="user_email"
          placeholder="What's your e-mail?"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setEmail(e.target.value)
          }
        />

        <label htmlFor="message">Your message</label>
        <textarea
          required
          className="p-1.5 rounded-md resize-none h-44"
          id="message"
          name="message"
          placeholder="What do you want to say?"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
            setMessage(e.target.value)
          }
        />

        <button className="bg-blue-700 p-2 mt-5 rounded-sm text-white font-semibold">
          Send
        </button>
      </form>
    </div>
  );
};

export default Mail;
