'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useCallback, useRef, useState } from "react"

export function RegisterForm() {
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const repeatPasswordInputRef = useRef<HTMLInputElement>(null)

    const [formError,setFormError] = useState("")

    const handleRegisterSubmit = useCallback((e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setFormError("")

        const email = emailInputRef.current
        const password = passwordInputRef.current
        const repeatPassword = repeatPasswordInputRef.current

        const emailReg = new RegExp(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          );

        if(email && password && repeatPassword){
            if(!emailReg.test(email.value)){
                setFormError('Digite um e-mail válido.')
                return;
            }

            if(password.value.length < 8){
                setFormError("A senha precisa ter pelo menos 8 caracteres.")
                return;
            }
            
            if(password.value !== repeatPassword.value){
                setFormError('As senhas não são iguais.')
                return
            }
        }
    
    },[])

    return (
        <form onSubmit={(e)=> handleRegisterSubmit(e)}>
            <Card className="w-full max-w-sm m-auto mt-10">
            <CardHeader>
                <CardTitle className="text-2xl">Cadastro</CardTitle>
                <CardDescription>
                    Insira seus dados para se cadastrar.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input ref={emailInputRef} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input ref={passwordInputRef} id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="repeatPassword">Repita sua senha</Label>
                <Input ref={repeatPasswordInputRef} id="repeatPassword" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="grid">
                {formError && (
                    <div className="text-red-600 mb-4">
                        <p className="text-sm font-semibold">Erro no formulário</p>
                        <p>{formError}</p>
                    </div>
                )

                }
                <Button className="w-full">Cadastrar</Button>
            </CardFooter>
            </Card>
        </form>
  )
}
