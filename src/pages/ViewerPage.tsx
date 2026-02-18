import DrawingViewerSection from "@/components/viewerPage/drawing/DrawingViewerSection";
import SideBar from "@/components/viewerPage/search/SideBar";

export default function ViewerPage() {
  return (
    <main className="w-full flex">
      <SideBar />
      <DrawingViewerSection />
    </main>
  );
}
