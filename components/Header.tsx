import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function Header({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Task Manager
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8 w-[200px] md:w-[300px]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

