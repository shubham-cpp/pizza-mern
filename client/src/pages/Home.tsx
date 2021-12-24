import React, { ReactElement } from 'react';
import Card from '../components/Card';

const Home = function (): ReactElement {
  return (
    <article>
      <h1 className="text-xl font-bold text-orange-500 text-center">
        Hello from home
      </h1>
      <section className="mx-4 flex gap-4 flex-col md:flex-row max-w-md">
        <Card
          title="Chicken"
          vegan={false}
          price={200}
          img="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?b=1&k=20&m=938742222&s=170667a&w=0&h=HyfY78AeiQM8vZbIea-iiGmNxHHuHD-PVVuHRvrCIj4="
        />

        <Card
          title="Chicken"
          vegan={false}
          price={200}
          img="https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?b=1&k=20&m=938742222&s=170667a&w=0&h=HyfY78AeiQM8vZbIea-iiGmNxHHuHD-PVVuHRvrCIj4="
        />
      </section>
    </article>
  );
};

export default Home;
