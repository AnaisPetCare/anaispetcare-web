"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  petName: z.string().min(1),
  breed: z.string().min(1),
  age: z.string().min(1),
  service: z.string().min(1),
  checkin: z.string().min(1),
  checkout: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass = cn(
  "w-full bg-white border border-cream-border rounded-xl px-4 py-3",
  "font-body text-sm text-brown-dark placeholder:text-brown-dark/40",
  "focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose",
  "transition-all duration-200"
);

const labelClass = "block font-body text-sm font-semibold text-brown-dark mb-1.5";

export function BookingForm({ serviceNames }: { serviceNames?: string[] }) {
  const t = useTranslations("booking");
  const services = serviceNames ?? [];

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const preselected = sessionStorage.getItem("selected-service");
    if (preselected) {
      setValue("service", preselected);
      sessionStorage.removeItem("selected-service");
    }
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    const msg = [
      `Hola Anais! Quiero agendar un servicio 🐾`,
      ``,
      `👤 Mi nombre: ${data.name}`,
      `🐶 Mascota: ${data.petName}`,
      `🦴 Raza: ${data.breed}`,
      `🎂 Edad: ${data.age}`,
      `✅ Servicio: ${data.service}`,
      `📅 Check-in: ${data.checkin}`,
      data.checkout ? `🏁 Check-out: ${data.checkout}` : "",
      data.notes ? `💬 Notas: ${data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/573208504292?text=${encoded}`, "_blank");
  };

  return (
    <section id="booking" className="py-24 px-4 sm:px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Reservas
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg">{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-xl border border-cream-border p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className={labelClass}>{t("name_label")}</label>
              <input
                {...register("name")}
                placeholder={t("name_placeholder")}
                className={cn(inputClass, errors.name && "border-red-400 focus:ring-red-200")}
              />
            </div>

            {/* Pet name */}
            <div>
              <label className={labelClass}>{t("pet_name_label")}</label>
              <input
                {...register("petName")}
                placeholder={t("pet_name_placeholder")}
                className={cn(inputClass, errors.petName && "border-red-400 focus:ring-red-200")}
              />
            </div>

            {/* Breed */}
            <div>
              <label className={labelClass}>{t("breed_label")}</label>
              <input
                {...register("breed")}
                placeholder={t("breed_placeholder")}
                className={cn(inputClass, errors.breed && "border-red-400 focus:ring-red-200")}
              />
            </div>

            {/* Age */}
            <div>
              <label className={labelClass}>{t("age_label")}</label>
              <input
                {...register("age")}
                placeholder={t("age_placeholder")}
                className={cn(inputClass, errors.age && "border-red-400 focus:ring-red-200")}
              />
            </div>

            {/* Service */}
            <div className="sm:col-span-2">
              <label className={labelClass}>{t("service_label")}</label>
              <select
                {...register("service")}
                className={cn(inputClass, errors.service && "border-red-400 focus:ring-red-200")}
              >
                <option value="">{t("service_placeholder")}</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Check-in */}
            <div>
              <label className={labelClass}>{t("checkin_label")}</label>
              <input
                type="date"
                {...register("checkin")}
                className={cn(inputClass, errors.checkin && "border-red-400 focus:ring-red-200")}
              />
            </div>

            {/* Check-out */}
            <div>
              <label className={labelClass}>{t("checkout_label")}</label>
              <input
                type="date"
                {...register("checkout")}
                className={inputClass}
              />
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className={labelClass}>{t("notes_label")}</label>
              <textarea
                {...register("notes")}
                rows={3}
                placeholder={t("notes_placeholder")}
                className={cn(inputClass, "resize-none")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-rose text-white font-body font-bold text-base py-4 rounded-2xl hover:bg-rose-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 cursor-pointer"
          >
            <MessageCircle size={20} />
            {t("submit")}
            <Send size={16} />
          </button>

          <p className="mt-4 text-center font-body text-xs text-brown-dark/40">
            Te redirigiremos a WhatsApp con toda la información lista 🐾
          </p>
        </form>
      </div>
    </section>
  );
}
