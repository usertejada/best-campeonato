// lib/campeonatos.ts
import { createClient } from './supabase/client'

const supabase = createClient()

export interface Campeonato {
  id: string
  nome: string
  descricao: string | null
  data_inicio: string | null
  data_termino: string | null
  formato: 'mata_mata' | 'pontos_corridos' | 'grupos_mata_mata' | null
  numero_times: number | null
  local: string | null
  status: 'pendente' | 'em_andamento' | 'finalizado'
  logo_url: string | null
  created_at: string
  updated_at: string
}

export async function getCampeonatos() {
  const { data, error } = await supabase
    .from('campeonatos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Campeonato[]
}

export async function getCampeonatoById(id: string) {
  const { data, error } = await supabase
    .from('campeonatos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Campeonato
}

export async function createCampeonato(campeonato: Partial<Campeonato>) {
  const { data, error } = await supabase
    .from('campeonatos')
    .insert(campeonato)
    .select()
    .single()

  if (error) throw error
  return data as Campeonato
}

export async function updateCampeonato(id: string, campeonato: Partial<Campeonato>) {
  const { data, error } = await supabase
    .from('campeonatos')
    .update(campeonato)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Campeonato
}

export async function deleteCampeonato(id: string) {
  const { error } = await supabase
    .from('campeonatos')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function uploadCampeonatoLogo(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error } = await supabase.storage
    .from('campeonatos-logos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from('campeonatos-logos')
    .getPublicUrl(fileName)

  return data.publicUrl
}