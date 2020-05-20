module.exports = {
  siteMetadata: {
    siteTitle: 'Mein blegh',
    siteDescription: 'Personal page of Shubham Rai',
    siteImage: '/banner.png', // main image of the site for metadata
    siteUrl: 'https://chronoblog.now.sh/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_US`,
    author: 'Shubham Rai', // for example - 'Ivan Ganev'
    authorDescription: 'DevOps guy with extensive experience of having dabbled all across the tech stack', // short text about the author
    avatar: '/avatar.png',
    twitterSite: '', // website account on twitter
    twitterCreator: '', // creator account on twitter
    social: [
      {
        icon: `at`,
        url: `mailto:shubham.rai.iitg@gmail.com`
      },
      {
        icon: `twitter`,
        url: `https://twitter.com/Shubham5830`
      },
      {
        icon: `github`,
        url: `https://github.com/shubhamrai1993/`
      }
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: true,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chronoblog Gatsby Theme`,
        short_name: `Chronoblog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ]
};
