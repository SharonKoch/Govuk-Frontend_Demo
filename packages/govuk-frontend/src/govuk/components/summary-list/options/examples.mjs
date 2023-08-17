/**
 * Component examples with Nunjucks macro options (or params)
 *
 * @satisfies {import('@govuk-frontend/lib/components').ComponentExample[]}
 */
export const examples = [
  {
    name: 'default',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          }
        }
      ]
    }
  },
  {
    name: 'with actions',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'name'
              },
              {
                href: '#',
                text: 'Delete',
                visuallyHiddenText: 'name'
              }
            ]
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'contact information'
              },
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'contact information'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'translated',
    options: {
      rows: [
        {
          key: {
            text: 'Enw'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                href: '#',
                html: 'Golygu<span class="govuk-visually-hidden"> enw</span>',
                visuallyHiddenText: ''
              },
              {
                href: '#',
                html: 'Dileu<span class="govuk-visually-hidden"> enw</span>',
                visuallyHiddenText: ''
              }
            ]
          }
        },
        {
          key: {
            text: 'Dyddiad geni'
          },
          value: {
            text: '13/08/1980'
          },
          actions: {
            items: [
              {
                href: '#',
                html: 'Golygu<span class="govuk-visually-hidden"> dyddiad geni</span>',
                visuallyHiddenText: ''
              }
            ]
          }
        },
        {
          key: {
            text: 'Gwybodaeth cyswllt'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                html: 'Golygu<span class="govuk-visually-hidden"> gwybodaeth cyswllt</span>',
                visuallyHiddenText: ''
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'with some actions',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'name'
              },
              {
                href: '#',
                text: 'Delete',
                visuallyHiddenText: 'name'
              }
            ]
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          }
        }
      ]
    }
  },
  {
    name: 'with no first action',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Sarah Philips'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '5 January 1978'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        },
        {
          key: {
            text: 'Address'
          },
          value: {
            html: '72 Guild Street<br>\nLondon<br>\nSE23 6FH\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'address'
              }
            ]
          }
        },
        {
          key: {
            text: 'Contact details'
          },
          value: {
            html: '07700 900457<br>\nsarah.phillips@example.com\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'contact details'
              }
            ]
          }
        },
        {
          key: {
            text: 'Licence period'
          },
          value: {
            html:
              '<p class="govuk-body">This is a longer paragraph of text provided by the user to provide additional information.</p>\n' +
              '<p class="govuk-body">This is a second paragraph of text provided by the user.</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'licence period'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'no-border',
    options: {
      classes: 'govuk-summary-list--no-border',
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          }
        }
      ]
    }
  },
  {
    name: 'no-border on last row',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          },
          classes: 'govuk-summary-list__row--no-border'
        }
      ]
    }
  },
  {
    name: 'overridden-widths',
    options: {
      rows: [
        {
          key: {
            classes: 'govuk-!-width-one-half',
            text: 'Name'
          },
          value: {
            classes: 'govuk-!-width-one-quarter',
            text: 'Firstname Lastname'
          },
          actions: {
            classes: 'govuk-!-width-one-half',
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'name'
              },
              {
                href: '#',
                text: 'Delete',
                visuallyHiddenText: 'name'
              }
            ]
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        },
        {
          key: {
            text: 'Contact information'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  email@email.com\n' +
              '</p>\n' +
              '<p class="govuk-body">\n' +
              '  Address line 1<br>\n' +
              '  Address line 2<br>\n' +
              '  Address line 3<br>\n' +
              '  Address line 4<br>\n' +
              '  Address line 5\n' +
              '</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'contact information'
              },
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'contact information'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'check-your-answers',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Sarah Philips'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'name'
              }
            ]
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '5 January 1978'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        },
        {
          key: {
            text: 'Address'
          },
          value: {
            html: '72 Guild Street<br>\nLondon<br>\nSE23 6FH\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'address'
              }
            ]
          }
        },
        {
          key: {
            text: 'Contact details'
          },
          value: {
            html: '07700 900457<br>\nsarah.phillips@example.com\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'contact details'
              }
            ]
          }
        },
        {
          key: {
            text: 'Previous application number'
          },
          value: {
            text: 502135326
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'previous application number'
              }
            ]
          }
        },
        {
          key: {
            text: 'Licence type'
          },
          value: {
            text: 'For personal use'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'licence type'
              }
            ]
          }
        },
        {
          key: {
            text: 'Home address'
          },
          value: {
            html:
              '<p class="govuk-body">\n' +
              '  72 Guild Street<br>\n' +
              '  London<br>\n' +
              '  SE23 6FH\n' +
              '</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'home address'
              }
            ]
          }
        },
        {
          key: {
            text: 'Licence period'
          },
          value: {
            html:
              '<p class="govuk-body">This is a longer paragraph of text provided by the user to provide additional information.</p>\n' +
              '<p class="govuk-body">This is a second paragraph of text provided by the user.</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'licence period'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'extreme',
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Barnaby Marmaduke Aloysius Benjy Cobweb Dartagnan Egbert Felix Gaspar Humbert Ignatius Jayden Kasper Leroy Maximilian Neddy Obiajulu Pepin Quilliam Rosencrantz Sexton Teddy Upwood Vivatma Wayland Xylon Yardley Zachary Usansky'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Buy'
              },
              {
                href: '#',
                text: 'Use'
              },
              {
                href: '#',
                text: 'Break'
              },
              {
                href: '#',
                text: 'Fix'
              },
              {
                href: '#',
                text: 'Trash'
              },
              {
                href: '#',
                text: 'Change'
              },
              {
                href: '#',
                text: 'Mail'
              },
              {
                href: '#',
                text: 'Upgrade'
              },
              {
                href: '#',
                text: 'Charge'
              },
              {
                href: '#',
                text: 'Point'
              },
              {
                href: '#',
                text: 'Zoom'
              },
              {
                href: '#',
                text: 'Press'
              },
              {
                href: '#',
                text: 'Snap'
              },
              {
                href: '#',
                text: 'Work'
              },
              {
                href: '#',
                text: 'Quick'
              },
              {
                href: '#',
                text: 'Erase'
              }
            ]
          }
        },
        {
          key: {
            text: 'Long website address'
          },
          value: {
            html: '<a class="govuk-link" href="https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch">https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch</a>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'long website address'
              }
            ]
          }
        },
        {
          key: {
            text: 'Long email address'
          },
          value: {
            html: '<a class="govuk-link" href="mailto:webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com">webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com</a>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'long email address'
              }
            ]
          }
        },
        {
          key: {
            text: 'No wrapping allowed'
          },
          value: {
            html: '<p class="govuk-body" style="white-space: nowrap;">michelle.longish.name@example.com</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'no wrapping allowed'
              }
            ]
          }
        },
        {
          key: {
            text: 'Pneumonoultramicroscopicsilicovolcanoconiosis'
          },
          value: {
            html:
              '<p class="govuk-body">Pneumonoultramicroscopicsilicovolcanoconiosis is a word coined by the president of the National Puzzlers’ League as a synonym for the disease known as silicosis. It is the longest word in the English language published in a dictionary, the Oxford English Dictionary, which defines it as "an artificial long word said to mean a lung disease caused by inhaling very fine ash and sand dust."</p>\n' +
              '<p class="govuk-body">Silicosis is a form of occupational lung disease caused by inhalation of crystalline silica dust, and is marked by inflammation and scarring in the form of nodular lesions in the upper lobes of the lungs. It is a type of pneumoconiosis.</p>\n'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Write'
              },
              {
                href: '#',
                text: 'Cut'
              },
              {
                href: '#',
                text: 'Paste'
              },
              {
                href: '#',
                text: 'Save'
              },
              {
                href: '#',
                text: 'Load'
              },
              {
                href: '#',
                text: 'Check'
              },
              {
                href: '#',
                text: 'Quick'
              },
              {
                href: '#',
                text: 'Rewrite'
              },
              {
                href: '#',
                text: 'Plug'
              },
              {
                href: '#',
                text: 'Play'
              },
              {
                href: '#',
                text: 'Burn'
              },
              {
                href: '#',
                text: 'Rip'
              },
              {
                href: '#',
                text: 'Drag and drop'
              },
              {
                href: '#',
                text: 'Zip'
              },
              {
                href: '#',
                text: 'Unzip'
              },
              {
                href: '#',
                text: 'Lock'
              },
              {
                href: '#',
                text: 'Fill'
              },
              {
                href: '#',
                text: 'Curl'
              },
              {
                href: '#',
                text: 'Find'
              },
              {
                href: '#',
                text: 'View'
              }
            ]
          }
        },
        {
          key: {
            text: 'Its vanished trees, the trees that had made way for Gatsby’s house, Pneumonoultramicroscopicsilicovolcanoconiosis had once pandered in whispers to the last and greatest of all human dreams; for a transitory enchanted moment man must have held his breath in the presence of this continent, compelled into an aesthetic contemplation he neither understood nor desired, face to face for the last time in history with something commensurate to his capacity for wonder.'
          },
          value: {
            text: 'The Great Gatsby'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Code'
              },
              {
                href: '#',
                text: 'Jam'
              },
              {
                href: '#',
                text: 'Unlock'
              },
              {
                href: '#',
                text: 'Surf'
              },
              {
                href: '#',
                text: 'Scroll'
              },
              {
                href: '#',
                text: 'Pose'
              },
              {
                href: '#',
                text: 'Click'
              },
              {
                href: '#',
                text: 'Cross'
              },
              {
                href: '#',
                text: 'Crack'
              },
              {
                href: '#',
                text: 'Twitch'
              },
              {
                href: '#',
                text: 'Update'
              },
              {
                href: '#',
                text: 'Name'
              },
              {
                href: '#',
                text: 'Read'
              },
              {
                href: '#',
                text: 'Tune'
              },
              {
                href: '#',
                text: 'Print'
              },
              {
                href: '#',
                text: 'Scan'
              },
              {
                href: '#',
                text: 'Send'
              },
              {
                href: '#',
                text: 'Fax'
              },
              {
                href: '#',
                text: 'Rename'
              },
              {
                href: '#',
                text: 'Touch'
              },
              {
                href: '#',
                text: 'Bring'
              },
              {
                href: '#',
                text: 'Pay'
              },
              {
                href: '#',
                text: 'Watch'
              },
              {
                href: '#',
                text: 'Turn'
              },
              {
                href: '#',
                text: 'Leave'
              },
              {
                href: '#',
                text: 'Stop'
              },
              {
                href: '#',
                text: 'Format'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'as a summary card with a text header',
    options: {
      card: {
        title: {
          text: 'Undergraduate teaching assistant'
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'as a summary card with a custom header level',
    options: {
      card: {
        title: {
          text: 'Undergraduate teaching assistant',
          headingLevel: 3
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'as a summary card with a html header',
    options: {
      card: {
        title: {
          html: '<em>Undergraduate teaching assistant</em>'
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'as a summary card with actions',
    options: {
      card: {
        title: {
          text: 'Undergraduate teaching assistant'
        },
        actions: {
          items: [
            {
              text: 'Delete job history',
              href: '#'
            },
            {
              text: 'Withdraw job history',
              href: '#'
            }
          ]
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'as a summary card with actions plus summary list actions',
    options: {
      card: {
        title: {
          text: 'Undergraduate teaching assistant'
        },
        actions: {
          items: [
            {
              text: 'Delete job history',
              href: '#'
            },
            {
              text: 'Withdraw job history',
              href: '#'
            }
          ]
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Edit',
                visuallyHiddenText: 'name'
              },
              {
                href: '#',
                text: 'Delete',
                visuallyHiddenText: 'name'
              }
            ]
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          },
          actions: {
            items: [
              {
                href: '#',
                text: 'Change',
                visuallyHiddenText: 'date of birth'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'attributes',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        }
      ],
      attributes: {
        'data-attribute-1': 'value-1',
        'data-attribute-2': 'value-2'
      }
    }
  },
  {
    name: 'with falsey values',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        null,
        false,
        '',
        {
          key: {
            text: 'Name 2'
          },
          value: {
            text: 'Firstname2 Lastname2'
          }
        }
      ]
    }
  },
  {
    name: 'key with html',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            html: '<b>Name</b>'
          },
          value: {
            html: '<strong>Firstname Lastname</strong>'
          }
        }
      ]
    }
  },
  {
    name: 'key with classes',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name',
            classes: 'app-custom-class'
          },
          value: {
            text: 'Firstname Lastname'
          }
        }
      ]
    }
  },
  {
    name: 'value with html',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            html: '<span>email@email.com</span>'
          }
        }
      ]
    }
  },
  {
    name: 'actions href',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                href: 'https://www.gov.uk',
                text: 'Go to GOV.UK'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'actions with html',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                html: 'Edit<span class="visually-hidden"> name</span>',
                href: '#'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'actions with classes',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            classes: 'app-custom-class',
            items: [
              {
                text: 'Edit',
                href: '/edit'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'actions with attributes',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                text: 'Edit',
                href: '#',
                attributes: {
                  'data-test-attribute': 'value',
                  'data-test-attribute-2': 'value-2'
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'single action with anchor',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                text: 'First action',
                href: '#'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'classes on items',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: [
              {
                text: 'Edit',
                href: '#',
                classes: 'govuk-link--no-visited-state'
              }
            ]
          }
        }
      ]
    }
  },
  {
    name: 'empty items array',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          actions: {
            items: []
          }
        }
      ]
    }
  },
  {
    name: 'rows with classes',
    hidden: true,
    options: {
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          },
          classes: 'app-custom-class'
        }
      ]
    }
  },
  {
    name: 'summary card with custom classes',
    hidden: true,
    options: {
      card: {
        classes: 'custom-class'
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'summary card with custom attributes',
    hidden: true,
    options: {
      card: {
        attributes: {
          'data-attribute-1': 'value-1',
          'data-attribute-2': 'value-2'
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  },
  {
    name: 'summary card with only 1 action',
    hidden: true,
    options: {
      card: {
        title: {
          text: 'Undergraduate teaching assistant'
        },
        actions: {
          items: [
            {
              text: 'My lonely action',
              href: '#'
            }
          ]
        }
      },
      rows: [
        {
          key: {
            text: 'Name'
          },
          value: {
            text: 'Firstname Lastname'
          }
        },
        {
          key: {
            text: 'Date of birth'
          },
          value: {
            text: '13/08/1980'
          }
        }
      ]
    }
  }
]
