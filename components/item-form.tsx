import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Item } from "../types"

interface ItemFormProps {
  item?: Item;
  onSubmit: (item: Omit<Item, 'id'>) => void;
}

export function ItemForm({ item, onSubmit }: ItemFormProps) {
  const [name, setName] = useState(item?.name || "")
  const [description, setDescription] = useState(item?.description || "")

  useEffect(() => {
    if (item) {
      setName(item.name)
      setDescription(item.description)
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, description })
    setName("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit">{item ? "Update" : "Add"} Item</Button>
    </form>
  )
}

