from flask import Blueprint, jsonify, make_response
import wikipediaapi
import requests


bp = Blueprint('wiki', __name__, url_prefix='/api')

wiki = wikipediaapi.Wikipedia(language='de',
                              extract_format=wikipediaapi.ExtractFormat.WIKI)


@bp.route('/records')
def retrieve_records():

    record = wiki.page('Arbeitserziehungslager_Ohrbeck')

    params = {
        'action': 'query',
        'format': 'json',
        'titles': 'Arbeitserziehungslager_Ohrbeck',
        'prop': 'images'
    }

    r = requests.get('https://de.wikipedia.org/w/api.php', params=params)

    items = r.json()['query']['pages']

    item_ids = [item for item in items]

    image = items[item_ids[0]]['images'][0]['title']

    return make_response(jsonify(summary=record.summary, image=image)), 200
