import { coordinateToCitys } from '@/lib/coordinateToCitys'
import { fetchAllECarryPhotos } from '@/data/photo'

import AnimatedCard from '../../_components/AnimatedCard'
import MapboxWithMarks from '@/components/MapboxWithMarks'
import { Photo } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CityOverview from '../../_components/CityOverview'
import ShuffleHero from '../../_components/SuffleHero'

interface CityData {
  name: string;
  total: number;
}

const page = async () => {
  const photos = await fetchAllECarryPhotos()

  if (photos.length < 1) {
    return null
  }

  const cityPromises = photos.map(async (photo: Photo) => {
    if (photo.latitude !== null && photo.longitude !== null){
      try {
        const city = await coordinateToCitys([photo.latitude, photo.longitude])

        return city[0].text.replace(/\s*Shi\s*/i, '')
      } catch (error) {
        console.error(`Error getting city for photo: ${photo.id}`);
      return null; 
      }
    }
  })

  const cities = await Promise.all(cityPromises)

  // 统计每个城市出现的次数
  const cityCounts: Record<string, number> = cities.reduce((counts, city) => {
    counts[city] = (counts[city] || 0) + 1;
    return counts;
  }, {});

  // 转换为所需格式
  // [
  //   { name: 'Hong Kong', total: 7 },
  //   { name: 'Xiamen Shi', total: 2 },
  //   { name: 'Fuzhou Shi', total: 3 },
  //   { name: 'Zhangzhou Shi', total: 3 },
  //   { name: 'Macau', total: 1 }
  // ]
  const cityData: CityData[] = Object.entries(cityCounts).map(([name, total]) => ({
    name,
    total
  }));

  // 找出 total 最多的对象
  const maxTotalCity: CityData = cityData.reduce(
    (max, city) => (city.total > max.total ? city : max),
    cityData[0]
  );

  return (
    <div className='flex flex-col gap-8 pb-4'>
      <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>

      <ShuffleHero />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedCard title='Total' value={photos.length} icon='Image' description='Taken Photos' />

        <AnimatedCard title='Total' value={cityData.length} icon='Map' description='Visited Cities' />

        <AnimatedCard title='The Most City' value={maxTotalCity.total} description={maxTotalCity.name} icon='City' />

        <AnimatedCard title='Total' value={0} icon='Heart' description='Favorite' />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CityOverview data={cityData} />
          </CardContent>
        </Card>
          
        <div className="col-span-1 h-auto min-h-[250px] md:col-span-2 rounded-lg overflow-hidden">
          <MapboxWithMarks photos={photos} />
        </div>

      </div>
    </div>
  )
}

export default page
