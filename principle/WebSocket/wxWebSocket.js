function lcWebSocket (url, token, onopen) {
  const ws = new wx.connectSocket({
    url: url,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-TOKEN': token
    },
    method: 'GET',
  })

  ws.onOpen(() => {
    onopen()
  })

  this.subscribeKey = 'subscribe';
  this.unSubscribeKey = 'unSubscribe';
  this.publishKey = 'publish';
  this.currSubscribe = '' // 当前订阅
  this.logopen = true; // 开启log

  // log
  function logInfo (data) {
		console.log('[firetower] INFO', data);
	}

  // 发送消息
  this.publish = (topic, data) => {
    if (topic == '' || data == '') {
      return errorMessage('topic或data参数不能为空');
    }

    if (this.logopen) {
      logInfo('publish topic:"' + topic + '", data:' + JSON.stringify(data));
    }

    let formatData = JSON.stringify({
      type: this.publishKey,
      topic: topic,
      data: data
    })
    ws.send({
      data: formatData,
      success: () => {
        return successMessage('发送成功')
      }
    })
  }

  // 订阅
  this.subscribe = (topicArr) => {
    if (!Array.isArray(topicArr)) {
      topicArr = [topicArr]
    }

    // 记录当前订阅
    this.currSubscribe = topicArr

    if (this.logopen) {
      logInfo('subscribe:"' + topicArr.join(',') + '"')
    }

    let formatData = JSON.stringify({
      type: this.subscribeKey,
      topic: topicArr.join(','),
      data: ''
    })
    ws.send({
      data: formatData
    })
  }

  // 服务器推送
  this.onmessage = (cb) => {
    ws.onMessage((event) => {
      if (this.logopen) {
        logInfo('new message:' + JSON.stringify(event.data))
      }
      if (event.data == 'heartbeat') {
        return
      }
      if (this.onmessage) {
        cb(event)
      }
    })
  }

  // 退订
	this.unsubscribe = (topicArr = this.currSubscribe, success) => {
		if (!Array.isArray(topicArr)) {
			topicArr = [topicArr]
		}

		if (this.logopen) {
			logInfo('unSubscribe:"' + topicArr.join(',') + '"')
		}

    let formatData = JSON.stringify({
      type: this.unSubscribeKey,
      topic: topicArr.join(','),
      data: ''
    })
    ws.send({
      data: formatData,
      success: success
    })
	}

  this.onclose = (cb) => {
    ws.onClose(() => {
      if (this.onclose) {
        cb()
      }
    })
  }


  // 错误信息
  function errorMessage(info){
    return {
      type: 'error',
      info: info
    }
  }

  // 成功信息
  function successMessage(info){
    return {
      type: 'success',
      info: info
    }
  }
}

const config = {
  wsHost: 'wss://url',
  url: 'url'
}

export default config

// 向 mpvue 提供插件
const install = function (Vue, options) {
  // 原型链挂载连接socket方法
  Vue.prototype.$connectWs = (token, onpen) => {
    Vue.prototype.$ws = new lcWebSocket(config.wsHost + config.url, token, onpen)
  }
}

export default {
  install,
  lcWebSocket
}
