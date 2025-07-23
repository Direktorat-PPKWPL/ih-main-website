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
  if (!user || user.role !== 'Author') {
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
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Globe className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Article Meta */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Artikel *
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan judul artikel yang menarik..."
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Judul yang baik: spesifik, menarik, dan mengandung kata kunci
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle/Deskripsi Singkat
                    </label>
                    <input
                      type="text"
                      placeholder="Deskripsi singkat artikel untuk preview..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori *
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <option value="">Pilih kategori...</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimasi Waktu Baca
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <option value="">Auto calculate</option>
                        <option value="1-2 min">1-2 menit</option>
                        <option value="3-5 min">3-5 menit</option>
                        <option value="5-10 min">5-10 menit</option>
                        <option value="10+ min">10+ menit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Ketik tag dan tekan Enter..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          infrastruktur-hijau ×
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          smart-city ×
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Tag populer:</p>
                        <div className="flex flex-wrap gap-2">
                          {popularTags.slice(0, 8).map((tag) => (
                            <button
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-purple-100 hover:text-purple-700"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag & drop gambar atau klik untuk upload</p>
                    <p className="text-sm text-gray-500">JPG, PNG, WebP. Max 5MB. Rasio 16:9 direkomendasikan</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alt Text (untuk SEO dan accessibility)
                    </label>
                    <input
                      type="text"
                      placeholder="Deskripsi gambar..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardContent className="p-0">
                <div className="border-b border-gray-200 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Konten Artikel</h3>
                  
                  {/* Toolbar */}
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-4 bg-gray-300" />
                    <Button variant="ghost" size="sm">
                      <Hash className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Code className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-4 bg-gray-300" />
                    <Button variant="ghost" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Editor Area */}
                <div className="p-6">
                  <textarea
                    rows={20}
                    placeholder="Mulai menulis artikel Anda di sini...

Gunakan Markdown untuk formatting:
# Judul Besar
## Sub Judul
**Bold Text**
*Italic Text*
[Link Text](URL)
![Alt Text](Image URL)

Tips menulis artikel yang baik:
- Gunakan struktur yang jelas dengan heading dan subheading
- Sertakan contoh konkret dan data yang mendukung
- Tambahkan gambar atau diagram untuk menjelaskan konsep
- Buat kesimpulan yang actionable untuk pembaca"
                    className="w-full border-0 focus:ring-0 focus:outline-none resize-none text-gray-900 leading-relaxed"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publikasi</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm">
                      <option value="draft">Draft</option>
                      <option value="pending">Pending Review</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibilitas
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="visibility" value="public" className="mr-2" defaultChecked />
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="text-sm">Public</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="visibility" value="private" className="mr-2" />
                        <Lock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Private</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="featured" className="mr-2" />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Artikel unggulan
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="comments" className="mr-2" defaultChecked />
                    <label htmlFor="comments" className="text-sm text-gray-700">
                      Izinkan komentar
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Deskripsi singkat untuk mesin pencari..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">0/160 karakter</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="infrastruktur hijau"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug URL
                    </label>
                    <div className="flex">
                      <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600">
                        /artikel/
                      </span>
                      <input
                        type="text"
                        placeholder="url-artikel"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Writing Guidelines */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Panduan Menulis</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">✅ Artikel Berkualitas</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• Min. 800 kata</li>
                      <li>• Struktur jelas dengan heading</li>
                      <li>• Sertakan data dan contoh</li>
                      <li>• Tambahkan gambar/diagram</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">💡 Tips SEO</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Gunakan keyword di judul</li>
                      <li>• Tulis meta description</li>
                      <li>• Internal/external links</li>
                      <li>• Alt text untuk gambar</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Word Count & Progress */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Jumlah Kata</span>
                      <span className="font-medium">0 / 800+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Kelengkapan</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Checklist:</p>
                    <ul className="space-y-1">
                      <li>• ✅ Judul artikel</li>
                      <li>• ⏳ Konten minimal</li>
                      <li>• ⏳ Featured image</li>
                      <li>• ⏳ Meta description</li>
                      <li>• ⏳ Tags</li>
                    </ul>
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
