import Feature from "../components/Feature"
import featuresData from '../data/featuresData'

export default function Home () {
    return (
        <>
            <div className='banner'>
                <article>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </article>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {
                    featuresData.map(feature => 
                        <Feature 
                            key={feature.id}
                            id={feature.id}
                            icon={feature.icon}
                            alt={feature.alt}
                            title={feature.title}
                            description={feature.description}
                        />
                    )
                }
            </section>
        </>
    )
}