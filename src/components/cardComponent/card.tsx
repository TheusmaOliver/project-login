import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


export function CardComponent() {
  return (
    <Card className="w-full max-w-sm m-auto mt-10">
        <CardHeader className="pb-2">
            <CardTitle className="text-4xl">Rayane</CardTitle>
            <CardDescription className="text-sm italic !m-0">Parceira de uno</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-sm text-muted-foreground">
            Ama one piece, Hungria, Harry Potter, Supernatural, Animação.
            </div>
        </CardContent>
    </Card>
  )
}
