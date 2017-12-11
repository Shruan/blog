# WEEX Android 踩坑记录
### weex plugin插件安装
> 当weex项目使用到了第三发插件时，需要执行 (weex plugin add xxx) 添加插件报错：
  <pre><code>
    error: could not find gradle wrapper within android sdk. might need to update your android sdk
  </pre></code>
这是环境安装问题： 需要将 templates 文件 安装到 Android/sdk/tools 下  

template文件路径 ：
<pre><code>
  ...\plugins\android\lib\templates #我的是 /Applications/Android\ Studio.app/Contents/plugins/android/lib/templates
</pre></code>

安装路径：
<pre><code>
  ...\Android\sdk\tools #我的 ~/Library/Android/sdk/tools
</pre></code>

直接使用命令
<pre><code>
  cp -r /Applications/Android\ Studio.app/Contents/plugins/android/lib/templates ~/Library/Android/sdk/tools
</pre></code>

### 问题 Error: spawn EACCES
  说明没有权限，执行以下命令，添加下权限
  <pre><code>
    chmod a+x ~/Library/Android/sdk/tools/templates/gradle/wrapper/gradlew
  </pre></code>


 outputFileName = "${variant.name}-${variant.versionName}.apk"
