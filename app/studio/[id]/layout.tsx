import Breadcrumbs from "@/components/studio/Breadcrumbs";

export default function StudioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    id?: string
    canvasId?: string
  }
}) {

  return (
    <>
      <Breadcrumbs params={params} />
      <main>{children}</main>
    </>
  )
}



