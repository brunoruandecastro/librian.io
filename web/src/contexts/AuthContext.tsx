"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  picture?: string
  googleId: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Verificar se há token no localStorage ao carregar
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      // Verificar se o token ainda é válido
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://librianio-production.up.railway.app'}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          // Token inválido, remover do localStorage
          localStorage.removeItem('auth_token')
          throw new Error('Token inválido')
        }
      })
      .then(userData => {
        setToken(savedToken)
        setUser(userData)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [mounted])

  const login = async (authToken: string) => {
    try {
      setLoading(true)
      if (mounted) {
        localStorage.setItem('auth_token', authToken)
      }
      setToken(authToken)

      // Buscar dados do usuário
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://librianio-production.up.railway.app'}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        console.log('Login realizado com sucesso:', userData)
      } else {
        console.error('Erro na resposta do servidor:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('Detalhes do erro:', errorText)
        throw new Error(`Falha ao buscar dados do usuário: ${response.status}`)
      }
    } catch (error) {
      console.error('Erro no login:', error)
      logout()
      // Redirecionar para login com erro
      if (typeof window !== 'undefined') {
        window.location.href = '/login?error=login_failed'
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    if (mounted) {
      localStorage.removeItem('auth_token')
    }
    setToken(null)
    setUser(null)
    setLoading(false)
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}