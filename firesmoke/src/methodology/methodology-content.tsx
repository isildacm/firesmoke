"use client";
import { useTranslations } from "next-intl";

const MethodologyContent = () => {
  const t = useTranslations("Methodology");

  return (
    <div className="container py-5">
      <h1
        dangerouslySetInnerHTML={{
          __html: t.raw("title"),
        }}
      ></h1>
      <p className="justified-text" dangerouslySetInnerHTML={{ __html: t.raw("general_content") }}></p>
      <h2
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: t.raw("fires") }}
      ></h2>
      <p className="justified-text" dangerouslySetInnerHTML={{ __html: t.raw("lorem_ipsum") }}></p>
      <h2
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: t.raw("models") }}
      ></h2>
      <div className="d-flex flex-column flex-lg-row gap-4">
        <p
          className="justified-text" dangerouslySetInnerHTML={{ __html: t.raw("models_description") }}
        ></p>
        <img
          src="/esquema_BRAMS_SFIRE.jpg" 
          alt="BRAMS" width="817" height="398"
        />
      </div>
      <h2
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: t.raw("air_quality") }}
      ></h2>
      <p
        className="justified-text" dangerouslySetInnerHTML={{ __html: t.raw("air_quality_description") }}
      ></p>
      <table className="w-100" border={1} cellPadding={2} cellSpacing={0}>
        <thead>
          <tr>
            <td
              rowSpan={2}
              style={{ verticalAlign: "top" }}
              dangerouslySetInnerHTML={{ __html: t.raw("pollutant") }}
            ></td>
            <td colSpan={5}>
              {t.raw("index")}
              <br />
              <span
                dangerouslySetInnerHTML={{ __html: t.raw("index_sub") }}
              ></span>
            </td>
          </tr>
          <tr>
            <td>{t("index_good")}</td>
            <td>{t("index_fair")}</td>
            <td>{t("index_moderate")}</td>
            <td>{t("index_poor")}</td>
            <td>{t("index_very_poor")}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              dangerouslySetInnerHTML={{ __html: t.raw("particles_25") }}
            ></td>
            <td>{t("0-10")}</td>
            <td>{t("10-20")}</td>
            <td>{t("20-25")}</td>
            <td>{t("25-50")}</td>
            <td>{t("50")}</td>
          </tr>
          <tr>
            <td
              dangerouslySetInnerHTML={{ __html: t.raw("particles_10") }}
            ></td>
            <td>{t("0-20")}</td>
            <td>{t("20-40")}</td>
            <td>{t("40-50")}</td>
            <td>{t("50-100")}</td>
            <td>{t("100")}</td>
          </tr>
          <tr>
            <td dangerouslySetInnerHTML={{ __html: t.raw("nitrogen") }}></td>
            <td>{t("0-40")}</td>
            <td>{t("40-90")}</td>
            <td>{t("90-120")}</td>
            <td>{t("120-230")}</td>
            <td>{t("230")}</td>
          </tr>
          <tr>
            <td dangerouslySetInnerHTML={{ __html: t.raw("ozone") }}></td>
            <td>{t("0-50")}</td>
            <td>{t("50-100")}</td>
            <td>{t("100-130")}</td>
            <td>{t("130-240")}</td>
            <td>{t("240")}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-4">{t.raw("Firesmoke")}</h2>

      <p
        className="justified-text" dangerouslySetInnerHTML={{ __html: t.raw("Firesmoke_description") }}
      ></p>
      <div className="mx-auto d-block" style={{ width: "75%", aspectRatio: "16/9" }}>
       <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/15n7rf44abQ?start=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
       ></iframe>
      </div>
    </div>
  );
};

export default MethodologyContent;
