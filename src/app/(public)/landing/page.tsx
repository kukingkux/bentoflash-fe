import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/cn";
import { Oranienbaum } from "next/font/google";

const oranienbaum = Oranienbaum({
  subsets: ["latin"],
  weight: "400",
});

const heroImage =
  "https://www.figma.com/api/mcp/asset/8531802c-a7db-43ca-90f1-7f9d0c736db1";
const plateImage =
  "https://www.figma.com/api/mcp/asset/85476328-d660-4227-8727-cb8896c7031b";
const cardImage =
  "https://www.figma.com/api/mcp/asset/5f8487f1-9441-4ecc-b782-daf61ca45dd4";
const heroSecondaryImage =
  "https://www.figma.com/api/mcp/asset/dddfb47e-9ebb-447c-996f-d1cb04577d9c";

export default function LandingPage() {
  return (
    <main className="relative min-h-[calc(100vh-65px)] overflow-hidden bg-[#f0f0f0]">
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
        <div className="relative overflow-hidden rounded-[32px] bg-[#f5f3ee]">
          <div className="relative grid gap-12 px-6 pb-12 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-16 lg:pt-16">
            <div className="relative z-10 flex flex-col justify-center">
              <div className={cn(oranienbaum.className, "max-w-[400px] text-[#1f1f1f]")}>
                <p className="text-[40px] leading-none">Pre-Order now,</p>
                <p className="mt-1 text-[40px] leading-none">Instant Pick Up at Lunch!</p>
              </div>

              <p className="mt-6 max-w-[404px] text-sm leading-6 text-[#2f2f2f]">
                Kantina saves your lunch time by providing ready to pick up meal,
                without queue! No more waiting, no more hunger. We have surprises
                for you, limited time offers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Explore our menu
                </Button>
                <Button variant="secondary" size="lg">
                  Pick up Location
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-[560px] w-full max-w-[860px] overflow-hidden rounded-[32px] bg-gradient-to-b from-[#f7f1ea] to-[#efe5d3]">
                <img
                  src={heroImage}
                  alt="Hero food illustration"
                  className="absolute right-0 top-0 h-[420px] w-[520px] object-cover"
                />
                <img
                  src={heroSecondaryImage}
                  alt="Secondary food illustration"
                  className="absolute left-0 top-24 h-[340px] w-[420px] object-cover"
                />
                <img
                  src={plateImage}
                  alt="Featured plate"
                  className="absolute bottom-24 left-[20%] h-[310px] w-[300px] object-contain"
                />

                <div className="absolute right-8 top-8 flex w-[272px] flex-col gap-4">
                  <div className="rounded-[16px] bg-[#f1f1f1] p-2 shadow-sm">
                    <img src={cardImage} alt="Featured dish" className="h-48 w-full rounded-[12px] object-cover" />
                    <div className="px-3 pb-2 pt-3">
                      <p className={cn(oranienbaum.className, "text-[20px] text-[#1f1f1f]")}>
                        Nasi Padang
                      </p>
                      <p className="mt-1 text-sm text-[#5f5f5f]">Beef rendang, spinach, sambal</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-[#5f5f5f]">
                        <span className="icon-light text-base">location_on</span>
                        <span>Kantin Gedung TT</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] text-[#5f5f5f] line-through">Rp 20000</p>
                          <p className="text-[20px] font-semibold text-[#1f1f1f]">Rp 16000</p>
                        </div>
                        <Button variant="primary" size="sm">
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-8 top-8 flex w-[415px] max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-[16px] bg-gradient-to-b from-[#fdc9ae] to-white shadow-sm lg:left-10 lg:top-10">
            <div className="relative flex items-center justify-between bg-gradient-to-b from-[#db7741] to-[#f45d0c] px-6 py-3 text-[#f1f1f1]">
              <div className={cn(oranienbaum.className, "space-y-1 text-[32px]")}>
                <p>Flash Sale Everyday</p>
                <div className="flex items-end gap-2">
                  <span className="text-[32px]">at</span>
                  <span className="text-[48px]">14:00</span>
                </div>
              </div>
              <span className="icon-light text-[64px]">bolt</span>
            </div>
            <div className="space-y-3 px-6 py-4">
              <p className={cn(oranienbaum.className, "text-[20px] text-[#1f1f1f]")}>Nasi Ayam Geprek</p>
              <div className="space-y-1 text-sm text-[#5f5f5f]">
                <div className="flex items-center justify-between gap-4">
                  <span>Calorie</span>
                  <span>480 kcal</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Contains</span>
                  <span className="text-right">Fried chicken, lalapan, sambal</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-[#5f5f5f]">
                <span>Today’s Specialty</span>
                <span>Available at 14:00</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#f45d0c] px-6 py-2 text-xs text-[#f1f1f1]">
              <span>Flash Sale Countdown</span>
              <span>00:13:42</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
