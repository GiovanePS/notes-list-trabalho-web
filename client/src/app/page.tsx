import { redirect } from "next/navigation"

export default function RootPage() { /*função de exportação padrão do módulo*/
  redirect('/home')
}/*Não renderiza nenhum conteúdo visual, redireciona ('redirect') o usuário para a página home*/