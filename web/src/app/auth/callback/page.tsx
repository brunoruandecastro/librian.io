"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { BookOpen } from 'lucide-react'

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')
    
    console.log('Callback page - Token:', token ? 'presente' : 'ausente')
    console.log('Callback page - Error:', error)
    
    if (token) {
      console.log('Iniciando processo de login...')
      login(token).then(() => {
        console.log('Login bem-sucedido, redirecionando...')
        router.push('/')
      }).catch((err: Error) => {
        console.error('Erro no login:', err)
        router.push('/login?error=auth_failed')
      })
    } else if (error) {
      console.error('Erro recebido no callback:', error)
      router.push(`/login?error=${error}`)
    } else {
      console.error('Nem token nem erro encontrados')
      router.push('/login?error=no_token')
    }
  }, [searchParams, login, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent via-accent-dark to-accent rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-text-primary">Finalizando login na biblioteca...</h2>
          <p className="text-text-secondary">Aguarde enquanto configuramos sua conta</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </div>
    </div>
  )
}