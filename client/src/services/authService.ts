export const checkAuth = async () => {
  const response: Response = await fetch('http://localhost:5000/check', {  /*a função fetch é utilizada para fazer uma requisição HTTP GET para a URL 'http://localhost:5000/check'. O resultado da requisição é armazenado na variável response. */
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' /*indica que os cookies e cabeçalhos de autorização devem ser incluídos na requisição*/
  }).catch((error) => { /*Se houver um erro durante a requisição, ele será capturado e lançado novamente. */
    if (error) throw error

    return error /*Então, se algo der errado, a função retornará um objeto de erro.*/
  })

  if (response.status === 401) {
    return false /*status não autorizado, o que indica que a autenticação falhou*/
  }

  if (response.status === 200) {
    return true /*autenticação bem-sucedida*/
  }
}