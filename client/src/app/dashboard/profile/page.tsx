import InputText from "@/app/(components)/InputText";
import Button from "@/app/(components)/Button";

export default function Profile() {
    return (
        <div className="container mx-auto max-w-sm">
            <h1 className="header">Atualizar Perfil</h1>
            <form className="px-8 pt-6 pb-8 mb-4">
                <label className="label">Usuario:</label>
				<InputText id="username" type="text" name='username' placeholder="Usuário" />
                <label className="label">Email:</label>
				<InputText id="email" type="email" name='email' placeholder="Email" />
                <label className="label">Senha:</label>
				<InputText id="password" type="password" name='password' placeholder="Senha" />
                <label className="label">Confirmar Senha:</label>
				<InputText id="password" type="password" name='password' placeholder="Confirmar Senha" />
				<Button text="Salvar" />
            </form>
        </div>
    );
}