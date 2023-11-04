const { createClient } = require('redis')

class Redis {
  constructor () {
    this.client = createClient({
      url: process.env.REDIS_URL
    })
    this.client.connect().then()
  }

  async set (key, object, ttl = false) {
    try {
        if (ttl) {
            await this.client.set(key, object, {
              EX: ttl
            })
          } else {
            await this.client.set(key, object)
          } 
        
    } catch (error) {
        throw error
    }
  }

  async get (key) {
    try {
        return await this.client.get(key)
    } catch (error) {
        throw error
    }
  }

  async del (key) {
    // eslint-disable-next-line no-return-await
    return await this.client.del(key)
  }

  async flushAll () {
    // eslint-disable-next-line no-return-await
    return await this.client.flushAll('ASYNC')
  }

  async kill () {
    await this.client.disconnect().then()
  }

  async ttl (key) {
    await this.client.ttl(key)
  }
}

module.exports = Redis
