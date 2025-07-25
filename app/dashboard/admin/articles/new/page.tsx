import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewDashboardLayout from '@/app/components/NewDashboardLayout';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { PenTool, Save, Eye, Upload, Image, Video, Link, Bold, Italic, List, Quote, Code, Hash, Calendar, Tag, Globe, Lock } from 'lucide-react';

export default async function NewArticlePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = verifyAccessToken(token);
  if (!user || user.role !== 'High') {
    redirect('/login');
  }

  // Mock data untuk categories dan tags
  const categories = [
    'Teknologi', 'Tutorial', 'Case Study', 'Trend', 'Research', 
    'Best Practice', 'Innovation', 'Sustainability', 'Policy', 'Review'
  ];

  const popularTags = [
    'infrastruktur-hijau', 'smart-city', 'vertical-garden', 'urban-farming',
    'green-building', 'sustainable-design', 'iot', 'environment', 'jakarta',
    'climate-change', 'biodiversity', 'renewable-energy', 'waste-management'
  ];

  return (
    <NewDashboardLayout 
      user={{ email: user.email, role: user.role }} 
      title="Tulis Artikel Baru"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PenTool className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tulis Artikel Baru</h1>
                <p className="text-gray-600">Buat konten edukatif tentang infrastruktur hijau</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Simpan Draft</span>
              </Button>
              <Button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700">
                <Globe className="h-4 w-4" />
                <span>Publish</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title & Meta */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Artikel
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan judul artikel yang menarik..."
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ringkasan/Excerpt
                    </label>
                    <textarea
                      placeholder="Tulis ringkasan singkat artikel (opsional)..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Editor Toolbar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                  {/* Text Formatting */}
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" className="p-2">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Italic className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="h-6 w-px bg-gray-300" />
                  
                  {/* Lists & Blocks */}
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" className="p-2">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="h-6 w-px bg-gray-300" />
                  
                  {/* Media & Links */}
                  <div className="flex items-center space-x-1">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1 px-3">
                      <Image className="h-4 w-4" />
                      <span className="hidden sm:inline">Gambar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1 px-3">
                      <Video className="h-4 w-4" />
                      <span className="hidden sm:inline">Video</span>
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Main Editor */}
                <div>
                  <textarea
                    placeholder="Mulai menulis artikel Anda di sini... 

Anda bisa menggunakan markdown atau tulis dalam format teks biasa. Tips:
- Gunakan ## untuk heading
- **teks** untuk bold
- *teks* untuk italic
- [link text](url) untuk link
- ![alt text](image-url) untuk gambar"
                    rows={20}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-base leading-relaxed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Publikasi
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="draft">Draft</option>
                      <option value="published">Publikasi</option>
                      <option value="scheduled">Jadwalkan</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibilitas
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="visibility" value="public" defaultChecked className="mr-2" />
                        <Globe className="h-4 w-4 mr-1" />
                        <span className="text-sm">Publik</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="visibility" value="private" className="mr-2" />
                        <Lock className="h-4 w-4 mr-1" />
                        <span className="text-sm">Privat</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Hash className="h-4 w-4 mr-2" />
                  Kategori
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <input
                    type="text"
                    placeholder="Tambah kategori baru..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tambahkan tags (pisahkan dengan koma)..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Tags populer:</p>
                    <div className="flex flex-wrap gap-1">
                      {popularTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-md transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Gambar Utama
                </h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG hingga 5MB
                    </p>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Atau masukkan URL gambar..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    placeholder="Alt text untuk gambar..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  SEO & Meta
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      placeholder="Deskripsi singkat untuk search engine..."
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Maksimal 160 karakter</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="infrastruktur hijau"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NewDashboardLayout>
  );
}
