package com.jungh0.sen

import android.app.AlertDialog
import android.opengl.Visibility
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()

        web.settings.setAppCacheEnabled(false)
        web.settings.setSupportMultipleWindows(true)
        web.settings.javaScriptEnabled = true
        web.loadUrl("https://graduation-project2.github.io/Energy-trading-platform/index.html?11")
        web.setWebViewClient(object : WebViewClient() {

            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                var url = url
                if(url.contains("https://graduation-project2.github.io/Energy-trading-platform/account.html")){
                    showCreateCategoryDialog(url)
                    return true
                }
                else if(url.contains("https://graduation-project2.github.io/")){
                    loading()
                    web.loadUrl(url)
                    return true
                }
                return true
            }

            override fun onPageFinished(view: WebView, url: String) {}
        })

        loading()

    }

    private fun loading(){
        progressBar.visibility = View.VISIBLE
        Handler().postDelayed({
            progressBar.visibility = View.GONE
        },1000)
    }

    override fun onBackPressed() {
        web.goBack()
    }

    private fun showCreateCategoryDialog(url: String) {
        AlertDialog.Builder(this).apply {
            val dialogView = layoutInflater.inflate(R.layout.dialog, null)
            //val editText = dialogView.findViewById<EditText>(R.id.editTextName)

            setView(dialogView)

            setTitle("지갑 주소를 입력해주세요.")
            //setMessage("Enter Name Below")
            setPositiveButton("이동") { _, _ ->
                loading()
                web.loadUrl("https://graduation-project2.github.io/Energy-trading-platform/account.html?id=0x38a0D2f379943561038680b064d54d548a3B8041&11")
            }

            setNegativeButton("") { _, _ ->
                loading()
                web.loadUrl("https://graduation-project2.github.io/Energy-trading-platform/account.html?id=0x38a0D2f379943561038680b064d54d548a3B8041&11")
            }
        }.create().show()
    }

}
