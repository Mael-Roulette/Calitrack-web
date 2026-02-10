import Link from "next/link"
import featuresInfos from "@/data/public/features.json";
import FeatureCard from "./FeaturesCard";

export default function FeaturesSection () {
  return (
    <section id='features'>
        <h2 className="title-section font-calsans mt-8 mb-6 lg:mt-16 lg:mb-10 text-center">Tout ce dont tu as besoin pour <span>progresser</span></h2>

        <ul className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 mb-8">
          { featuresInfos.map( ( { id, icon, title, description } ) => {
            return (
              <li key={ id }>
                <FeatureCard id={ id } icon={ icon } title={ title } description={ description } />
              </li>
            )
          } ) }
        </ul>

        <div className='flex justify-center items-center'>
          <Link href="/features" aria-label="Découvrir toutes les fonctionnalités" className="underline text-center mb-16">Découvrir toutes les fonctionnalités</Link>
        </div>
      </section>
  )
}