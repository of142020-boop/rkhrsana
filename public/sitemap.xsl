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
            vertical-align: middle;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
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
        <div class="header">
          <h1>خريطة الموقع (XML Sitemap)</h1>
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
              <th style="width: 150px; text-align: center;">الصور المرتبطة</th>
              <th style="width: 150px;">التكرار</th>
              <th style="width: 100px;">الأولوية</th>
              <th style="width: 180px;">آخر تعديل</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <xsl:variable name="itemURL">
                    <xsl:value-of select="sitemap:loc"/>
                  </xsl:variable>
                  <a href="{$itemURL}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
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
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
                <td>
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        
        <div class="footer">
          <p>
            توليد الخريطة ديناميكياً باستخدام <a href="https://rkhrsana.com">رواد الخرسانة</a>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
