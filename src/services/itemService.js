export async function fetchItems() {
    try {
      const response = await fetch('/src/assets/data/items.json')
      if (!response.ok) throw new Error('Erro ao carregar os dados.')
      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar os itens:', error)
      return []
    }
  }
  