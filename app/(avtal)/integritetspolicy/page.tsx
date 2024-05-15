import NavBar from "@/app/NavBar";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />

      <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:px-0 bg-white">
        <div className="w-full max-w-4xl">
          <h1 className="text-8xl font-medium text-center mt-32 mb-20">
            Personuppgiftspolicy
          </h1>
          <div className="text-left">
            <h2 className="text-3xl font-medium">
              Sendigos personuppgiftspolicy
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Vi på Sendigo är engagerade i att skydda dina personuppgifter och
              att hantera dem på ett säkert och ansvarsfullt sätt. Denna
              personuppgiftspolicy förklarar hur vi samlar in, använder, delar
              och skyddar dina personuppgifter när du använder våra tjänster.
            </p>
            <h2 className="text-3xl font-medium mt-20">
              1. Vilka personuppgifter samlar vi in?
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Vi kan samla in följande typer av personuppgifter när du använder
              våra tjänster: Kontaktdetaljer, inklusive namn, e-postadress och
              telefonnummer.
              <br />
              <br />
              Leveransadresser och faktureringsinformation.
              <br />
              <br />
              Betalningsinformation, såsom kreditkortsnummer eller annan
              betalningsinformation.
              <br />
              <br />
              Informationen du ger oss när du kommunicerar med vår kundtjänst.
              <br />
              <br />
              Användningsdata och information om dina interaktioner med våra
              tjänster, inklusive information om dina transporter och
              leveranser.
            </p>
            <h2 className="text-3xl font-medium mt-20">
              2. Varför samlar vi in personuppgifter?
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Vi samlar in och använder dina personuppgifter för följande
              ändamål:
              <br />
              <br />
              För att tillhandahålla dig våra tjänster och att kunna genomföra
              bokning av transport samt möjliggöra leveranser av gods via tredje
              part.
              <br />
              <br />
              För att hantera betalningar och fakturering
              <br />
              <br />
              För att kommunicera med dig och tillhandahålla kundsupport.
              <br />
              <br />
              För att skicka dig marknadsföringsmeddelanden och annan
              information om våra tjänster, om du har gett ditt samtycke till
              detta.
            </p>
            <h2 className="text-3xl font-medium mt-20">
              3. Delar vi personuppgifter med tredje parter?
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Vi kan dela dina personuppgifter med följande kategorier av
              mottagare:
              <br />
              <br />
              Leverantörer och underleverantörer som hjälper oss att
              tillhandahålla våra tjänster, såsom leveranspartners och
              betalningsbehandlare.
              <br />
              <br />
              Affiliates och dotterbolag inom vårt företagsnätverk.
              <br />
              <br />
              Juridiska myndigheter eller andra tredje parter när det krävs
              enligt lag eller för att skydda våra rättigheter eller egendom.
            </p>
            <h2 className="text-3xl font-medium mt-20">
              4. Datalagring och säkerhet
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Vi lagrar dina personuppgifter så länge det är nödvändigt för att
              uppfylla de ändamål som anges i denna policy eller enligt
              tillämplig lagstiftning. Vi vidtar lämpliga tekniska och
              organisatoriska åtgärder för att skydda dina personuppgifter mot
              oavsiktlig förlust, åtkomst, förstörelse eller ändring.
            </p>
            <h2 className="text-3xl font-medium mt-20">5. Dina rättigheter</h2>
            <p className="text-xl text-gray-600 mt-4">
              Du har rätt att begära åtkomst till och korrigering av dina
              personuppgifter. Du har också rätt att begära radering av dina
              personuppgifter och att invända mot vår användning av dem för
              marknadsföringsändamål. För att utöva dessa rättigheter eller om
              du har några frågor eller bekymmer angående vår hantering av dina
              personuppgifter, vänligen kontakta oss på: <br />
              <a
                href="mailto:info@sendigo.se?&subject=Hjälp&body=Jag har en fråga kring:"
                className="text-blue-800"
              >
                avtal@sendigo.se
              </a>
            </p>
            <h2 className="text-3xl font-medium mt-20">
              6. Uppdateringar av policyn
            </h2>
            <p className="text-xl text-gray-600 mt-4 mb-20">
              Vi kan komma att uppdatera denna personuppgiftspolicy med jämna
              mellanrum för att återspegla förändringar i vår verksamhet eller
              tillämplig lagstiftning. Vi kommer att informera dig om eventuella
              väsentliga ändringar genom att publicera en uppdaterad version av
              policyn på vår webbplats.
              <br />
              <br />
              Genom att använda våra tjänster samtycker du till vår insamling,
              användning och delning av dina personuppgifter i enlighet med
              denna personuppgiftspolicy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
