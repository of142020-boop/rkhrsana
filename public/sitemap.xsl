<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع - رواد الخرسانة</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Open Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 40px;
            background-color: #f8fafc;
            direction: rtl;
          }
          .header {
            margin-bottom: 30px;
            text-align: center;
          }
          h1 {
            color: #0f172a;
            font-size: 28px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          p.desc {
            color: #64748b;
            font-size: 15px;
            margin-top: 5px;
          }
          .stats {
            background-color: #fca5a5;
            background-image: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: inline-block;
            margin-bottom: 30px;
            font-weight: bold;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          table {
            border: none;
            border-collapse: collapse;
            width: 100%;
            background: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            border-radius: 12px;
            overflow: hidden;
          }
          th {
            background-color: #0f172a;
            color: #fff;
            text-align: right;
            padding: 16px;
            font-size: 15px;
            font-weight: 600;
          }
          tr {
            transition: all 0.2s;
            border-bottom: 1px solid #e2e8f0;
          }
          tr:last-child {
            border-bottom: none;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          tr:hover {
            background-color: #fffbeb;
          }
          td {
            padding: 16px;
            font-size: 14px;
            color: #475569;
            vertical-align: top;
          }
          .url-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
            font-size: 15px;
            display: inline-block;
            direction: ltr; /* Fix trailing slash rendering issue */
          }
          .url-link:hover {
            text-decoration: underline;
            color: #1d4ed8;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #e2e8f0;
            color: #475569;
            border-radius: 9999px;
            padding: 2px 8px;
            font-size: 12px;
            font-weight: 700;
            min-width: 20px;
          }
          .has-images {
            background-color: #dcfce7 !important;
            color: #166534 !important;
          }
          .image-list {
            margin-top: 12px;
            padding: 14px;
            background-color: #f1f5f9;
            border-radius: 6px;
            border-right: 4px solid #f59e0b;
          }
          .image-list-title {
            margin: 0 0 8px 0;
            color: #334155;
            font-weight: bold;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .image-list-title svg {
            width: 16px;
            height: 16px;
            color: #f59e0b;
          }
          .image-list ul {
            margin: 0;
            padding-right: 20px;
            list-style-type: square;
          }
          .image-list li {
            margin-bottom: 8px;
          }
          .image-list a {
            color: #0ea5e9;
            text-decoration: none;
            direction: ltr;
            display: inline-block;
            word-break: break-all;
          }
          .image-list a:hover {
            text-decoration: underline;
            color: #0284c7;
          }
          .image-title {
            color: #64748b;
            font-size: 13px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
          }
          .footer a {
            color: #64748b;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <!-- Check if this is a sitemapindex (Index mapping file) -->
        <xsl:choose>
          <!-- SITEMAP INDEX VIEW -->
          <xsl:when test="sitemap:sitemapindex">
            <div class="header">
              <h1>الفهرس الرئيسي لخرائط الموقع</h1>
              <p class="desc">هذا الفهرس يحتوي على روابط للخرائط الفرعية: خريطة الصفحات وخريطة الصور.</p>
            </div>
            
            <div style="text-align: center;">
              <div class="stats">
                إجمالي الخرائط الفرعية: <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>رابط الخريطة الفرعية (Sitemap URL)</th>
                  <th style="width: 250px;">آخر تعديل</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <xsl:variable name="sitemapURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$sitemapURL}" class="url-link">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:when>

          <!-- URL SET VIEW (Pages or Images) -->
          <xsl:otherwise>
            <div class="header">
              <h1>
                <xsl:choose>
                  <xsl:when test="count(sitemap:urlset/sitemap:url/image:image) &gt; 0">
                    خريطة الموقع (صور)
                  </xsl:when>
                  <xsl:otherwise>
                    خريطة الموقع (صفحات)
                  </xsl:otherwise>
                </xsl:choose>
              </h1>
              <p class="desc">تم إنشاء هذه الخريطة بواسطة رواد الخرسانة لتحسين الفهرسة في محركات البحث.</p>
            </div>
            
            <div style="text-align: center;">
              <div class="stats">
                إجمالي الروابط: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>الرابط (URL)</th>
                  <!-- Only show image column in image sitemap -->
                  <xsl:if test="count(sitemap:urlset/sitemap:url/image:image) &gt; 0">
                    <th style="width: 120px; text-align: center;">عدد الصور</th>
                  </xsl:if>
                  <xsl:if test="sitemap:urlset/sitemap:url/sitemap:changefreq">
                    <th style="width: 120px;">التكرار</th>
                  </xsl:if>
                  <xsl:if test="sitemap:urlset/sitemap:url/sitemap:priority">
                    <th style="width: 80px;">الأولوية</th>
                  </xsl:if>
                  <th style="width: 160px;">آخر تعديل</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}" class="url-link">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                      
                      <!-- Render images if they exist -->
                      <xsl:if test="count(image:image) &gt; 0">
                        <div class="image-list">
                          <p class="image-list-title">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            الصور المرفقة بالصفحة:
                          </p>
                          <ul>
                            <xsl:for-each select="image:image">
                              <li>
                                <a href="{image:loc}" target="_blank">
                                  <xsl:value-of select="image:loc"/>
                                </a>
                                <xsl:if test="image:title">
                                  <span class="image-title"> (<xsl:value-of select="image:title"/>)</span>
                                </xsl:if>
                              </li>
                            </xsl:for-each>
                          </ul>
                        </div>
                      </xsl:if>
                    </td>

                    <!-- Image Count Column (Only if we are in Image Sitemap) -->
                    <xsl:if test="count(//sitemap:urlset/sitemap:url/image:image) &gt; 0">
                      <td style="text-align: center;">
                        <div>
                          <xsl:attribute name="class">
                            <xsl:choose>
                              <xsl:when test="count(image:image) &gt; 0">badge has-images</xsl:when>
                              <xsl:otherwise>badge</xsl:otherwise>
                            </xsl:choose>
                          </xsl:attribute>
                          <xsl:value-of select="count(image:image)"/>
                        </div>
                      </td>
                    </xsl:if>

                    <xsl:if test="sitemap:changefreq">
                      <td><xsl:value-of select="sitemap:changefreq"/></td>
                    </xsl:if>
                    
                    <xsl:if test="sitemap:priority">
                      <td><xsl:value-of select="sitemap:priority"/></td>
                    </xsl:if>

                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:otherwise>
        </xsl:choose>

        <div class="footer">
          <p>
            تجميع ديناميكي للروابط والصور بواسطة <a href="https://rkhrsana.com">رواد الخرسانة</a>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
