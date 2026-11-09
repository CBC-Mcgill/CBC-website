import type { Metadata } from "next";
import Link from "next/link";
import { Clawd } from "@/components/Clawd";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="paper band">
      <div className="container page-head">
        <Clawd size={88} />
        <h1 className="display">Nothing taped here.</h1>
        <p className="lead">
          That page does not exist, or it moved. The things we actually built are
          one click away.
        </p>
        <div className="actions">
          <Link className="btn" href="/">
            Back to the home page
          </Link>
          <Link className="btn btn-outline" href="/projects">
            See the projects
          </Link>
        </div>
      </div>
    </section>
  );
}
