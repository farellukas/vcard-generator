import { SubmitHandler, useForm } from "react-hook-form";
import { createVCard, Data } from "../../lib/vcard";
import { createQR, encodeSVG } from "../../lib/qr";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";

function MainSection() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Partial<Data> | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>();
  const onSubmit: SubmitHandler<Data> = async (data) => {
    // set submitted data
    setSubmitted(data);

    // create vcard
    const vcard = createVCard(data);
    const qr = await createQR(vcard);
    setQrCode(qr);
  };
  const formValues = watch();
  useEffect(() => {
    // reset QR code
    if (!isEqual(submitted, formValues)) {
      setQrCode(null);
    }
  }, [formValues, submitted]);

  return (
    <div className="space-y-4 w-full">
      {/* form */}
      <form
        className="flex flex-col gap-4 flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* errors */}
        {errors.firstName && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error: {errors.firstName.message}</span>
          </div>
        )}
        {errors.url && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error: {errors.url.message}</span>
          </div>
        )}

        {/* first name */}
        <label className="floating-label">
          <span>First Name</span>
          <input
            className="input w-full"
            {...register("firstName", {
              required: "First Name is required",
            })}
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

        {/* phone */}
        <label className="floating-label">
          <span>Phone</span>
          <input
            className="input w-full"
            {...register("workPhone")}
            placeholder="Phone"
          />
        </label>

        {/* email */}
        <label className="floating-label">
          <span>Email</span>
          <input
            className="input w-full"
            {...register("workEmail")}
            placeholder="Email"
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
            {...register("url", {
              pattern: {
                value: /^(https?):\/\/[^\s/$.?#].[^\s]*$/i,
                message: "URL must start with http:// or https://",
              },
            })}
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
