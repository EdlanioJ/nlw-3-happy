import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
    div.content {
      width: 1100px;
      margin: 0 auto;
      header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        border-bottom: 1px solid #d3e2e5;
        margin-bottom: 40px;
        padding-bottom: 24px;
        padding-top: 64px;

        h1 {
          font-size: 32px;
          line-height: 34px;
          color: #5c8599;
          font-weight: 700;
        }

        span {
          color: #5c8599;
        }
      }
      div.card-container {
        padding-top: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 32px;

        div.card {
          width: 545px;
          height: 310px;
          border-radius: 20px;

          background: #fff;
          overflow: hidden;
          .leaflet-container {
            border-radius: 20px;
          }

          div.card-footer {
            display: flex;
            background: #fff;
            flex: 1;
            flex-direction: row;

            justify-content: space-between;
            align-items: center;

            padding: 14px 32px;

            a {
              text-decoration: none;
              font-size: 24px;
              line-height: 20px;
              color: #5c8599;
            }
            div.card-buttons {
              display: flex;
              flex-direction: row;
              a {
                width: 48px;
                height: 48px;
                border-radius: 20px;
                background: ${(props) => props.theme.colors.background};

                display: flex;
                align-items: center;
                justify-content: center;

                :nth-child(n + 2) {
                  margin-left: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
`;
