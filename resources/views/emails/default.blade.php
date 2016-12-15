@foreach($data as $key => $value)
    <b>{{$words[$key]}}: </b>
    @if(is_array($value))
        <ol>
        @foreach($value as $li => $list_value)
            @if(is_array($list_value))
                <li>
                    <ul>
                    @foreach($list_value as $i => $nested_value)
                        <li><b>{{isset($words[sprintf('%s:%s', $key, $i)]) ? $words[sprintf('%s:%s', $key, $i)] : $words[$i]}}: </b>{{isset($words[$nested_value]) ? $words[$nested_value] : $nested_value}}</li>
                    @endforeach
                    </ul>
                    <br/>
                </li>
            @else
                <li>{{isset($words[$list_value]) ? $words[$list_value] : $list_value}}</li>
            @endif
        @endforeach
        </ol>
    @else
        {{isset($words[$value]) ? $words[$value] : $value}}
    @endif
    <br/>
@endforeach