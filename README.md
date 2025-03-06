# Codesnippify - code snippets management & sharing tool

![Codesnippify Logo](https://github.com/user-attachments/assets/f1284faf-4f67-4358-8d3f-269138a550e2)


Codesnippify is a modern web application for managing and sharing code snippets. Built with Next.js and Supabase, it allows developers to organize snippets by language and folders, add tags for easy filtering, and share collections with others.

## Features

- **Snippet Management**: Create, edit, and organize your code snippets
- **Language Support**: Syntax highlighting for multiple programming languages
- **Folder Organization**: Group related snippets into folders
- **Tagging System**: Add tags to snippets for easy filtering and discovery
- **Search Functionality**: Quickly find snippets with full-text search
- **Favorites**: Mark snippets as favorites for quick access
- **Trash Management**: Safely delete and restore snippets
- **Sharing**: Share individual snippets or entire folders with others
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/harshwasthere/codesnippify.git
cd codesnippify
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Roadmap

- [x] Core snippet management functionality
- [x] Folder organization
- [x] Tagging system
- [x] Search functionality
- [x] Sharing capabilities
- [ ] **Payment Integration with Razorpay**: Implement premium plans and subscriptions
- [ ] **Advanced Search**: Filters by date, complexity, and more detailed criteria
- [ ] **Pagination**: Improve performance for users with large snippet collections
- [ ] **Unit Testing**: Comprehensive test coverage for all components
- [ ] Mobile applications (iOS/Android)
- [ ] Collaborative editing
- [ ] Version history for snippets
- [ ] AI-powered snippet suggestions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with 🌱 by [Harsh Yadav](https://github.com/harshwasthere)
