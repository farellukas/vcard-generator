import { SubmitHandler, useForm } from "react-hook-form";
import { createQR, encodeSVG } from "../lib/qr";
import { useState } from "react";
import { createVCard, Data } from "../lib/vcard";

type Inputs = Data;

function App() {
  const [qrCode, setQrCode] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const vcard = createVCard(data);
    const qr = await createQR(vcard);
    setQrCode(qr);
  };

  return (
    <main className="h-screen flex justify-center">
      <div className="py-16 space-y-8 container max-w-3xl">
        <h1 className="text-4xl font-bold">QR Business Card Generator</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="input w-full"
          />
          <input
            type="text"
            {...register("middleName", {
              required: false,
            })}
            placeholder="Middle Name"
            className="input w-full"
          />
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="input w-full"
          />
          <input
            type="text"
            {...register("organization")}
            placeholder="Organization"
            className="input w-full"
          />
          <button className="btn" type="submit">
            Create QR
          </button>
        </form>
        {!!qrCode && <img src={encodeSVG(qrCode)} />}
      </div>
    </main>
  );
}

export default App;
