import $http from '@/config/http'

export default {
  paid: () => {
    return $http.get('/sales/paid')
  }
}
