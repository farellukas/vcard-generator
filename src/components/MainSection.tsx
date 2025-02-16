import { SubmitHandler, useForm } from "react-hook-form";
import { createVCard, Data } from "../../lib/vcard";
import { createQR, encodeSVG } from "../../lib/qr";
import { useState } from "react";

function MainSection() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<Data>();
  const onSubmit: SubmitHandler<Data> = async (data) => {
    const vcard = createVCard(data);
    console.log(vcard);
    const qr = await createQR(vcard);
    setQrCode(qr);
  };

  return (
    <div className="space-y-4 w-full">
      {/* form */}
      <form
        className="flex flex-col gap-4 flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* first name */}
        <label className="floating-label">
          <span>First Name</span>
          <input
            className="input w-full"
            {...register("firstName")}
            placeholder="First Name"
          />
        </label>

        {/* last name */}
        <label className="floating-label">
          <span>Last Name</span>
          <input
            className="input w-full"
            {...register("lastName")}
            placeholder="Last Name"
          />
        </label>

        {/* email */}
        <label className="floating-label">
          <span>Email</span>
          <input
            className="input w-full"
            {...register("email")}
            placeholder="Email"
          />
        </label>

        {/* phone */}
        <label className="floating-label">
          <span>Phone</span>
          <input
            className="input w-full"
            {...register("workPhone")}
            placeholder="Phone"
          />
        </label>

        {/* organization */}
        <label className="floating-label">
          <span>Organization</span>
          <input
            className="input w-full"
            {...register("organization")}
            placeholder="Organization"
          />
        </label>

        {/* website */}
        <label className="floating-label">
          <span>Website</span>
          <input
            className="input w-full"
            {...register("url")}
            placeholder="Website"
          />
        </label>

        {/* submit */}
        <button className="btn" type="submit">
          Generate QR Code
        </button>
      </form>

      {/* qr code */}
      <div className="w-full">
        {!!qrCode && <img src={encodeSVG(qrCode)} alt="QR Code" />}
      </div>
    </div>
  );
}

export default MainSection;
