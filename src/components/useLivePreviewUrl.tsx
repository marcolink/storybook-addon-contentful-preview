export const useLivePreviewUrl = () => {

  const currentParams = new URLSearchParams(window.location.search);
  const pathParam = currentParams.get('path');

  let id = ''

  if(pathParam) {
    id = pathParam.split('/')[2]
  }

  const searchParams = new URLSearchParams();
  searchParams.set('viewMode', 'story')
  searchParams.set('id', id)
  searchParams.set('entryId', '{entry.sys.id}')
  searchParams.set('environment', '{env_id}')
  searchParams.set('locale', '{locale}')

  return decodeURIComponent(`${window.origin}/iframe.html?${searchParams.toString()}`)
}
