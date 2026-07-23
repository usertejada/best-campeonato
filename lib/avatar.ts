// lib/avatar.ts

import { createClient } from './supabase/client'

export async function uploadAvatar(file: File): Promise<string> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Usuário não autenticado')

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}-${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('avatar')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from('avatar').getPublicUrl(fileName)
  const avatarUrl = data.publicUrl

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: avatarUrl },
  })

  if (updateError) throw updateError

  return avatarUrl
}