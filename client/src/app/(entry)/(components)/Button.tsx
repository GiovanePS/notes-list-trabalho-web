type TextProps = {
  texto: string
}

export default function Button(props: TextProps) {
  return (
    <>
      <input className='bg-[#005CE6] mt-2 text-slate-100 text-base py-1 px-4 border border-blue-700 rounded-md shadow shadow-[#005CE6] 
      hover:bg-[#003AE6] hover:border-blue-900' type='submit' value={props.texto}></input>
    </>
  )
}