/* eslint-disable @next/next/no-img-element */
import { Oranienbaum } from "next/font/google";

import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/cn";

const oranienbaum = Oranienbaum({
  subsets: ["latin"],
  weight: "400",
});

const assets = {
  image8:
    "https://www.figma.com/api/mcp/asset/9d7dbde8-3fbb-4f5d-9f69-17b7131db079",
  image10:
    "https://www.figma.com/api/mcp/asset/65cebe5b-ea02-40da-a675-cbe2bbae4647",
  image11:
    "https://www.figma.com/api/mcp/asset/a228dd32-1d7f-4a41-b251-f7d1245f1fd2",
  image12:
    "https://www.figma.com/api/mcp/asset/c5f69683-675c-4ffd-9e35-0bfee3ccf20a",
  image16:
    "https://www.figma.com/api/mcp/asset/69496db5-5fc4-4d67-baf9-974eb04eeb24",
  image17:
    "https://www.figma.com/api/mcp/asset/c641d859-905d-488f-96b4-fbd4f9dc51c9",
  image18:
    "https://www.figma.com/api/mcp/asset/8def5648-a2d3-4372-800c-73ed9b29a08a",
  image19:
    "https://www.figma.com/api/mcp/asset/d5ce443b-8e8f-4925-a397-87036c82e7ae",
  image20:
    "https://www.figma.com/api/mcp/asset/a48e9291-c197-4bd4-acf3-e1a2642bd8de",
};

type ProductCardData = {
  title: string;
  subtitle: string;
  location: string;
  originalPrice?: string;
  finalPrice: string;
  image: string;
};

type CartItemData = {
  title: string;
  location: string;
  notes: string;
  originalPrice: string;
  finalPrice: string;
  image: string;
};

const hotOffers: ProductCardData[] = [
  {
    title: "Nasi Padang",
    subtitle: "Beef rendang, spinach, sambal",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 20000",
    finalPrice: "Rp 16000",
    image: assets.image17,
  },
  {
    title: "Chicken Katsu",
    subtitle: "Breadcrumb fried chicken",
    location: "Kantin Gedung DC",
    finalPrice: "Rp 15000",
    image: assets.image16,
  },
  {
    title: "Coffee Latte",
    subtitle: "Classic Latte Hot/Iced",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 8000",
    finalPrice: "Rp 6000",
    image: assets.image18,
  },
  {
    title: "Nasi Padang",
    subtitle: "Beef rendang, spinach, sambal",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 20000",
    finalPrice: "Rp 16000",
    image: assets.image17,
  },
];

const forYou: ProductCardData[] = [
  {
    title: "Chicken Katsu",
    subtitle: "Breadcrumb fried chicken",
    location: "Kantin Gedung DC",
    finalPrice: "Rp 15000",
    image: assets.image16,
  },
  {
    title: "Nasi Padang",
    subtitle: "Beef rendang, spinach, sambal",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 20000",
    finalPrice: "Rp 16000",
    image: assets.image17,
  },
  {
    title: "Coffee Latte",
    subtitle: "Classic Latte Hot/Iced",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 8000",
    finalPrice: "Rp 6000",
    image: assets.image18,
  },
  {
    title: "Chicken Katsu",
    subtitle: "Breadcrumb fried chicken",
    location: "Kantin Gedung DC",
    finalPrice: "Rp 15000",
    image: assets.image16,
  },
];

const beverages: ProductCardData[] = [
  {
    title: "Coffee Latte",
    subtitle: "Classic Latte Hot/Iced",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 8000",
    finalPrice: "Rp 6000",
    image: assets.image18,
  },
  {
    title: "Coffee Latte",
    subtitle: "Classic Latte Hot/Iced",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 8000",
    finalPrice: "Rp 6000",
    image: assets.image18,
  },
];

const snacks: ProductCardData[] = [
  {
    title: "Chicken Katsu",
    subtitle: "Breadcrumb fried chicken",
    location: "Kantin Gedung DC",
    finalPrice: "Rp 15000",
    image: assets.image16,
  },
  {
    title: "Nasi Padang",
    subtitle: "Beef rendang, spinach, sambal",
    location: "Kantin Gedung TT",
    originalPrice: "Rp 20000",
    finalPrice: "Rp 16000",
    image: assets.image17,
  },
];

const cartItems: CartItemData[] = [
  {
    title: "Nasi Ayam Geprek",
    location: "Kantin Gedung DC",
    notes: "Cabai 2",
    originalPrice: "Rp 16000",
    finalPrice: "Rp 12000",
    image: assets.image19,
  },
  {
    title: "Es Teh",
    location: "Kantin Gedung DC",
    notes: "-",
    originalPrice: "Rp 4000",
    finalPrice: "Rp 3000",
    image: assets.image20,
  },
  {
    title: "Nasi Ayam Geprek",
    location: "Kantin Gedung DC",
    notes: "Cabai 2",
    originalPrice: "Rp 16000",
    finalPrice: "Rp 12000",
    image: assets.image19,
  },
];

function ProductCard({
  image,
  title,
  subtitle,
  location,
  originalPrice,
  finalPrice,
}: ProductCardData) {
  return (
    <article className="w-[272px] shrink-0 rounded-[16px] bg-[#fafafa] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="relative h-48 overflow-hidden rounded-[12px] bg-[#aeaeae]">
        <img
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          src={image}
        />
      </div>
      <div className="rounded-[12px] px-3 py-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className={cn(oranienbaum.className, "text-[20px] text-[#1f1f1f]")}>
              {title}
            </h3>
            <p className="text-[14px] text-[#5f5f5f]">{subtitle}</p>
          </div>
          <div className="flex items-center gap-1 text-[#5f5f5f]">
            <span className="icon-light material-symbols-outlined text-[24px]">location_on</span>
            <p className="text-[14px] font-medium">{location}</p>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            {originalPrice ? (
              <p className="text-[10px] font-semibold text-[#5f5f5f] line-through">
                {originalPrice}
              </p>
            ) : null}
            <p className="mt-0.5 text-[20px] font-semibold text-[#1f1f1f]">
              {finalPrice}
            </p>
          </div>
          <Button
            className="min-h-0 rounded-[24px] px-4 py-1.5 text-[14px]"
            endIcon={<span className="icon-light material-symbols-outlined text-[20px]">add</span>}
            size="sm"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}

function CartItem({
  image,
  title,
  location,
  notes,
  originalPrice,
  finalPrice,
}: CartItemData) {
  return (
    <article className="flex items-start gap-2">
      <img
        alt={title}
        className="h-16 w-16 rounded-[12px] object-cover"
        src={image}
      />
      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[#5f5f5f]">
              <span className="icon-light material-symbols-outlined text-[20px]">location_on</span>
              <p className="text-[12px]">{location}</p>
            </div>
            <h3 className="text-[16px] font-medium text-[#1f1f1f]">{title}</h3>
            <p className="text-[12px] italic text-[#5f5f5f]">
              Notes: <span className="not-italic text-[#1f1f1f]">{notes}</span>
            </p>
          </div>
          <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-[#eeeeee]">
            <button className="flex h-[19px] w-5 items-center justify-center text-[#5f5f5f]">
              -
            </button>
            <span className="flex h-[19px] items-center justify-center border-x border-[#eeeeee] px-4 text-[14px] text-[#1f1f1f]">
              1
            </span>
            <button className="flex h-[19px] w-5 items-center justify-center text-[#5f5f5f]">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between gap-4 self-stretch">
          <button className="text-[14px] font-medium text-[#f45d0c]">Edit</button>
          <div className="text-right">
            <p className="text-[10px] font-semibold text-[#5f5f5f] line-through">
              {originalPrice}
            </p>
            <p className="mt-1 text-[14px] font-semibold text-[#1f1f1f]">
              {finalPrice}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  title,
  products,
  showRail = false,
}: {
  title: string;
  products: ProductCardData[];
  showRail?: boolean;
}) {
  return (
    <section className="space-y-6">
      <h2 className={cn(oranienbaum.className, "text-[40px] text-[#1f1f1f]")}>
        {title}
      </h2>
      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-4">
          {products.map((product) => (
            <ProductCard key={`${title}-${product.title}-${product.finalPrice}`} {...product} />
          ))}
        </div>
      </div>
      {showRail ? (
        <div className="hidden h-[3px] rounded-full bg-[#e2e2e2] lg:block">
          <div className="h-full w-[65%] rounded-full bg-[#f45d0c]" />
        </div>
      ) : null}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-85px)] overflow-hidden bg-[#f0f0f0]">
      <div className="mx-auto flex max-w-[1440px] gap-8 px-4 pb-10 pt-8 sm:px-6 lg:px-8 xl:gap-10">
        <div className="relative hidden xl:block xl:w-[150px]">
          <div className="pointer-events-none absolute left-[-790px] top-[-38px] h-[1226px] w-[883px]">
            <div className="absolute left-[173px] top-0 h-[497px] w-[630px] rotate-[14deg] overflow-hidden shadow-[-66px_130px_52.8px_rgba(0,0,0,0.18),136px_82px_52.8px_rgba(0,0,0,0.15)]">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={assets.image8}
              />
            </div>
            <div className="absolute left-[94px] top-[341px] h-[463px] w-[643px] rotate-[19deg] overflow-hidden">
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                src={assets.image10}
              />
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                src={assets.image11}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
            </div>
            <div className="absolute left-[158px] top-[915px] h-[418px] w-[534px] -rotate-[13deg] overflow-hidden shadow-[-31px_28px_34.9px_rgba(0,0,0,0.23)]">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={assets.image12}
              />
            </div>
            <div className="absolute left-[850px] top-[538px] flex w-[62px] flex-col items-center rounded-[24px] border border-[#e0e0e0] bg-[#fafafa] px-1 pb-10 pt-12 shadow-[1px_16px_15.1px_rgba(0,0,0,0.05),inset_-2px_0_4px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col items-center">
                <p className="h-[37px] rotate-90 text-[14px] font-medium text-[#1f1f1f]">
                  Open
                </p>
                <span className="icon-light material-symbols-outlined mt-3 text-[24px] text-[#1f1f1f]">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="min-w-0 flex-1 xl:max-w-[926px]">
          <div className="space-y-10 rounded-[32px] bg-transparent xl:pl-8">
            <ProductSection products={hotOffers} showRail title="Hot Offers" />
            <ProductSection products={forYou} title="For You" />
            <ProductSection products={beverages} title="Beverages" />
            <ProductSection products={snacks} title="Snacks" />
          </div>
        </section>

        <aside className="w-full max-w-[480px] shrink-0 xl:sticky xl:top-28 xl:self-start">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between bg-linear-to-b from-[#db7741] to-[#f45d0c] px-6 py-4 text-white">
                <h2 className={cn(oranienbaum.className, "text-[32px] leading-none")}>
                  Today&apos;s Flash Sale
                </h2>
                <span className="icon-light material-symbols-outlined text-[32px]">bolt</span>
              </div>
              <div className="space-y-5 px-6 py-4">
                <div className="space-y-2">
                  <h3 className={cn(oranienbaum.className, "text-[20px] text-[#1f1f1f]")}>
                    Nasi Ayam Geprek
                  </h3>
                  <div className="space-y-1 text-[14px] text-[#5f5f5f]">
                    <div className="flex items-center justify-between gap-4">
                      <p>Calorie</p>
                      <p>480 kcal</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p>Contains</p>
                      <p className="text-right">Fried chicken, lalapan, sambal</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[14px] text-[#5f5f5f]">
                  <p>Today&apos;s Specialty</p>
                  <p>Available at 14:00</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#f45d0c] px-6 py-1.5 text-[12px] text-white">
                <p>Flash Sale Countdown</p>
                <p>00:13:42</p>
              </div>
            </section>

            <section className="rounded-[24px] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-1">
                  <h2 className={cn(oranienbaum.className, "text-[32px] text-[#1f1f1f]")}>
                    My Cart
                  </h2>
                  <span className="pb-1 text-[14px] text-[#5f5f5f]">(2)</span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <CartItem key={`${item.title}-${item.finalPrice}`} {...item} />
                  ))}
                </div>

                <div className="h-px bg-[#eeeeee]" />

                <div className="space-y-6">
                  <div className="space-y-2.5 text-[14px] text-[#5f5f5f]">
                    <div className="flex items-center justify-between">
                      <p>Normal Price</p>
                      <p>Rp20000</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Discount</p>
                      <p>Rp-5000</p>
                    </div>
                    <div className="flex items-center justify-between text-[#1f1f1f]">
                      <p>Total</p>
                      <p className="text-[24px] font-semibold">Rp15000</p>
                    </div>
                  </div>

                  <Button className="w-full rounded-[24px] text-[14px]" size="md">
                    Confirm Order
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
