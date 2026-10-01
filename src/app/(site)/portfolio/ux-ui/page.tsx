import type { Metadata } from "next";
import { getCategory } from "@/lib/portfolio";
import { CategoryPage } from "@/components/category-page";
import "../../../work.css";
import "../../../gallery.css";
import "../../../portfolio.css";

const cat = getCategory("ux-ui")!;

export const metadata: Metadata = { title: cat.title, description: cat.blurb };

export default function Page() {
  return <CategoryPage cat={cat} />;
}
