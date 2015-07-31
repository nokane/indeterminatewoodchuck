var React           = require('react');
var assign          = require('object-assign');

var AboutPage = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row">
              <div className="col-md-3" id="leftCol">
                      
              <div className="well"> 
                      <ul className="nav nav-stacked" id="sidebar">
                        <li><a href="#sec1">Section 1</a></li>
                        <li><a href="#sec2">Section 2</a></li>
                        <li><a href="#sec3">Section 3</a></li>
                        <li><a href="#sec4">Section 4</a></li>
                      </ul>
                </div>

                </div>  
                <div className="col-md-9">
                      <h2 id="sec0">Getting Started</h2>

                      <p>Inject the Portalize script by inserting the following line of code into your HTML file:</p>
                      <pre><code className='hljs html'>
                        &lt;script src="http://www.portalize.io/library"&gt;&lt;/script&gt;
                      </code></pre>
                      <p>
                        Additionally, add the Portalize CSS link to your HTML file to import the Portalize default styles.  
                        Place this link before all other CSS links in your HTML file if you plan on overriding the default CSS styles.
                      </p>
                      <pre><code className='hljs html'>
                        &lt;link href="https://portalize.io/librarystyles" rel="stylesheet"&gt;
                      </code></pre>
                      


                      <h2 id="sec1">Choosing a Customer Interface Style</h2>
                      <p>
                        You have two options for displaying the Portalize interface to your customers. Your first option 
                        is to display a button which is fixed to the bottom of the user’s screen, which displays the the 
                        full Portalize interface through a sliding panel.  Alternatively, you can embed your own button 
                        and div element which will house the Portalize customer interface.  Please see the following links 
                        for examples of the <span><a href='http://sheltered-citadel-9273.herokuapp.com/' target="_blank">sliding interface</a> </span>
                        and the <span><a href='http://sheltered-citadel-9273.herokuapp.com/index-alt.html' target="_blank">embedded interface</a></span>.
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="panel panel-default">
                            <div className="panel-heading"><h3>Hello.</h3></div>
                            <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. 
                            Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis 
                            dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. 
                            Aliquam in felis sit amet augue.
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                            <div className="panel-heading"><h3>Hello.</h3></div>
                            <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. 
                            Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis 
                            dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. 
                            Aliquam in felis sit amet augue.
                            </div>
                          </div>
                        </div>  
                      </div>
                    
                    
                      <h2 id="sec2">Section 2</h2>
                      <p>
                      Rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores 
                      eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut!
                      </p>
                      <div className="row">
                        <div className="col-md-4"><img src="//placehold.it/300x300" className="img-responsive" /></div>
                          <div className="col-md-4"><img src="//placehold.it/300x300" className="img-responsive" /></div>
                          <div className="col-md-4"><img src="//placehold.it/300x300" className="img-responsive" /></div>
                      </div>
                    
                    
                      <h2 id="sec3">Section 3</h2>
                  Images are responsive sed @mdo but sum are more fun peratis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores 
                      eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut..
                      <br />
                      Fos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut..
                    
                    
                      <h2 id="sec4">Section 4</h2>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia cor magni dolores 
                      eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
                      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                    
                      
                      
                </div> 
          </div>
      </div>
    )
  }
});

module.exports = AboutPage;
