import AllProducts from "@/Components/Home/AllProducts";
import Hero from "@/Components/Home/Hero";
import HigherPrice from "@/Components/Home/HigherPrice";
import LowerPrice from "@/Components/Home/LowerPrice";


export default function Home() {
  return (
    <div>
      <Hero />
      <HigherPrice />
      <LowerPrice />
      <AllProducts />
    </div>
  );
}
